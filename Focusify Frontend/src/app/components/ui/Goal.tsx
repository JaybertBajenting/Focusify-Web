"use client";
import React, { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";
import { RxCheckbox } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid"; // Import UUID library

interface UserDetails {
  id: number;
}

interface UserData {
  user: UserDetails;
  token: string;
}

interface Goal {
  id: string;
  text: string;
}

const Goal = () => {
  const [ongoingLength, setOngoingLength] = useState<number>(0);
  const [completed, setCompleted] = useState<number>(0);
  const [task, setTask] = useState<string>("");
  const [parsedUser, setParsedUser] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<number>(0);
  const [onGoingGoal, setOnGoingGoal] = useState<Goal[]>([]);
  const [completedGoal, setCompletedGoal] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<"ongoing" | "completed">(
    "ongoing"
  );

  useEffect(() => {
    const getUserFromLocalStorage = localStorage.getItem("user");
    if (getUserFromLocalStorage !== null) {
      const parsed: UserData = JSON.parse(getUserFromLocalStorage);
      setParsedUser(parsed);
      setUserId(parsed.user.id);
      getOngoingGoals(parsed.user.id);
      getCompletedGoals(parsed.user.id);
    }
  }, []);

  //coment
  //another comment
  const getOngoingGoals = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/auth/user/task/ongoing-goals/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
     

      const goalsWithId = data.map((goal: string) => ({
        id: uuidv4(),
        text: goal,
      }));
      setOnGoingGoal(goalsWithId);
      setOngoingLength(goalsWithId.length);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompletedGoals = async (id: number) => {
    try {
      const response = await fetch(
        `https://focusify.onrender.com/api/v1/auth/user/task/completed-goals/${id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();
    

      const goalsWithId = data.map((goal: string) => ({
        id: uuidv4(),
        text: goal,
      }));
      setCompletedGoal(goalsWithId);
      setCompleted(goalsWithId.length);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOnGoingGoal = async (id: string) => {
    try {
      const userId = parsedUser?.user.id;
      const goal = onGoingGoal.find((goal) => goal.id === id);
      if (!goal) return;

      const response = await fetch(
        `https://focusify.onrender.com/api/v1/auth/user/task/deleteOnGoingGoal/${userId}/${goal.text}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      setOnGoingGoal((prevGoals) => prevGoals.filter((g) => g.id !== id));
      setOngoingLength((prevLength) => prevLength - 1);
     
    } catch (error) {
      console.log(error);
    }
  };

  const addCompletedGoal = async (goal: Goal) => {
    try {
      const userId = parsedUser?.user.id;
      const response = await fetch(
        `https://focusify.onrender.com/api/v1/auth/user/task/addFinishedGoal/${userId}/${goal.text}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      setCompletedGoal((prevGoals) => [...prevGoals, goal]);
      setCompleted((prev) => prev + 1);
      
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOngoingGoal = async (goalText: string) => {
    try {
      const userId = parsedUser?.user.id;
      const response = await fetch(
        `https://focusify.onrender.com/api/v1/auth/user/task/addOnGoingGoal/${userId}/${goalText}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();
      const newGoal = { id: uuidv4(), text: goalText };
      setOnGoingGoal((prevGoals) => [...prevGoals, newGoal]);
      setOngoingLength((prevLength) => prevLength + 1);
      setTask("");

    
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheck = async (id: string) => {
    const goal = onGoingGoal.find((goal) => goal.id === id);
    if (goal) {
      await deleteOnGoingGoal(id);
      await addCompletedGoal(goal);
    }
  };

  const handleDelete = (id: string) => {
    deleteOnGoingGoal(id);
  };

  const handleModalOpen = (content: "ongoing" | "completed") => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full justify-center mt-[50px]">
      <div className="w-[300px] bg-white rounded-[10px] pb-[10px] relative">
        <div className="ml-[15px] mr-[15px] pt-[15px]">
          <h1 className="text-gray font-bold text-[20px]">Session Goals</h1>
          <div className="space-y-[15px]">
            <div className="flex space-x-[20px]">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                name=""
                id=""
                placeholder="Enter Goal"
                className="px-[10px] py-[10px] rounded-[10px] text-[16px] w-[200px] border-black border-2"
              />
              <button
                className="font-bold border-black border-2 rounded-[10px] px-[10px]"
                onClick={() => handleAddOngoingGoal(task)}
              >
                Add
              </button>
            </div>
            <div className="flex bg-mainBg rounded-[10px] h-[125px] px-[20px] justify-between items-center">
              <div
                className="w-[100px]"
                onClick={() => handleModalOpen("ongoing")}
              >
                <h1 className="text-red-500 text-[42px] text-center cursor-pointer">
                  {ongoingLength}
                </h1>
                <p className="font-bold text-center">Ongoing</p>
              </div>
              <div className="items-center flex">
                <div className="w-[2px] h-[75px] bg-gray-50 "></div>
              </div>
              <div
                className="w-[100px]"
                onClick={() => handleModalOpen("completed")}
              >
                <h1 className="text-green-500 text-[42px] text-center cursor-pointer">
                  {completed}
                </h1>
                <p className="font-bold text-center">Completed</p>
              </div>
            </div>
          </div>
          <ul className="max-h-[150px] overflow-auto space-y-[10px] mt-[10px]">
            {onGoingGoal.map((goal) => (
              <li
                key={goal.id}
                className="bg-mainBg rounded-[10px] py-[10px] px-[15px]"
              >
                <div className="flex justify-between">
                  <div className="flex">
                    <RxCheckbox
                      className="cursor-pointer w-[25px] h-[25px]"
                      onClick={() => handleCheck(goal.id)}
                    />
                    {goal.text}
                  </div>
                  <div>
                    <CiTrash
                      className="cursor-pointer w-[25px] h-[25px]"
                      onClick={() => handleDelete(goal.id)}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div
            className="bg-white max-h-[400px] overflow-auto rounded-lg w-[400px] p-4 relative"
            style={{ backgroundColor: "#f0f8ff" }}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={handleModalClose}
            >
              <AiOutlineClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">
              {modalContent === "ongoing" ? "Ongoing Goals" : "Completed Goals"}
            </h2>
            <div className="flex justify-between mb-4">
              <button
                className={`px-4 py-2 rounded-lg font-bold ${
                  modalContent === "ongoing"
                    ? "bg-skyblue text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setModalContent("ongoing")}
              >
                Ongoing
              </button>
              <button
                className={`px-4 py-2 rounded-lg font-bold ${
                  modalContent === "completed"
                    ? "bg-skyblue text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setModalContent("completed")}
              >
                Completed
              </button>
            </div>
            <ul className="space-y-2">
              {(modalContent === "ongoing" ? onGoingGoal : completedGoal).map(
                (goal) => (
                  <li key={goal.id} className="flex items-center space-x-2">
                    {modalContent === "completed" && (
                      <RxCheckbox className="text-green-500 w-[20px] h-[20px]" />
                    )}
                    {modalContent === "ongoing" && (
                      <RxCheckbox className="text-red-500 w-[20px] h-[20px]" />
                    )}
                    <span>{goal.text}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goal;
