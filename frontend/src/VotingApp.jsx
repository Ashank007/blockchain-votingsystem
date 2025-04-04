import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingABI from "../Voting.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const VotingApp = () => {
  const [account, setAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const fetchCandidates = async (contractInstance) => {
    try {
      const candidatesCount = await contractInstance.methods.candidatesCount().call();
      let candidatesList = [];
      for (let i = 1; i <= candidatesCount; i++) {
        let candidate = await contractInstance.methods.candidates(i).call();
        candidatesList.push(candidate);
      }
      setCandidates(candidatesList);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const web3Instance = new Web3("http://127.0.0.1:8545");
        const availableAccounts = await web3Instance.eth.getAccounts();
        const contractInstance = new web3Instance.eth.Contract(VotingABI.abi, CONTRACT_ADDRESS);

        setWeb3(web3Instance);
        setAccounts(availableAccounts);
        setAccount(availableAccounts[0]);
        setContract(contractInstance);

        await fetchCandidates(contractInstance);

        contractInstance.events.VoteCast()
          .on("data", (event) => {
            console.log("Vote cast event:", event);
            fetchCandidates(contractInstance);
            toast.success("New vote recorded on the blockchain!", {
              position: "top-right",
              autoClose: 3000,
            });
          })
          .on("error", (error) => console.error("Event error:", error));
      } catch (error) {
        console.error("Init failed:", error);
      }
    };

    init();
  }, []);

  const vote = async (candidateId) => {
    try {
      await contract.methods.vote(candidateId).send({ from: account });
      toast.success("Your vote has been successfully recorded!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      await fetchCandidates(contract);
    } catch (error) {
      toast.error("Voting failed. You may have already voted or there was a network error.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Vote failed:", error);
    }
  };

  const handleAccountChange = (event) => {
    setAccount(event.target.value);
    console.log("Selected account:", event.target.value);
  };

  return (
    <div>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #e5e7eb;
          }
          .app-container {
            min-height: 100vh;
            width: 100vw;
            background: linear-gradient(135deg, #4b5e91 0%, #7e8bb7 100%);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 40px 20px;
            box-sizing: border-box;
            overflow: auto;
          }
          .voting-header {
            background-color: rgba(255, 255, 255, 0.95);
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            width: 100%;
            max-width: 800px;
            text-align: center;
            margin-bottom: 30px;
          }
          .title {
            font-size: 32px;
            font-weight: 700;
            color: #1f2937;
            margin: 0 0 20px 0;
          }
          .account-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
          }
          .account-label {
            font-size: 16px;
            font-weight: 600;
            color: #1f2937;
          }
          .account-dropdown {
            position: relative;
            width: 100%;
            max-width: 500px;
          }
          .account-select {
            width: 100%;
            padding: 12px 40px 12px 15px;
            font-size: 15px;
            border-radius: 8px;
            border: 2px solid #e5e7eb;
            background-color: #ffffff;
            color: #1f2937;
            appearance: none;
            cursor: pointer;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
          }
          .account-select:hover {
            border-color: #10b981;
          }
          .account-select:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
          }
          .account-select option {
            padding: 10px;
            background-color: #ffffff;
            color: #1f2937;
          }
          .dropdown-arrow {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #6b7280;
            pointer-events: none;
          }
          .candidate-container {
            width: 100%;
            max-width: 800px;
            padding: 0 10px;
            box-sizing: border-box;
          }
          .candidate-list {
            list-style: none;
            padding: 0;
            margin: 0;
            width: 100%;
          }
          .candidate-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
            padding: 20px 25px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            width: 100%;
            box-sizing: border-box;
          }
          .candidate-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .candidate-info {
            color: #1f2937;
            flex: 1;
            margin-right: 20px;
          }
          .candidate-info strong {
            font-size: 18px;
            font-weight: 600;
          }
          .candidate-info span {
            margin-left: 10px;
            font-size: 14px;
            color: #6b7280;
          }
          .vote-button {
            padding: 10px 25px;
            background-color: #10b981;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
            min-width: 100px;
          }
          .vote-button:hover {
            background-color: #059669;
          }
          .vote-button:focus {
            outline: none;
            box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.4);
          }
          .loading {
            font-size: 18px;
            color: #ffffff;
            text-align: center;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            width: 100%;
            max-width: 800px;
            box-sizing: border-box;
          }
          /* Custom toast styles */
          .Toastify__toast {
            border-radius: 8px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }
          .Toastify__toast--success {
            background: #10b981;
          }
          .Toastify__toast--error {
            background: #ef4444;
          }
        `}
      </style>
      <div className="app-container">
        <div className="voting-header">
          <h1 className="title">Blockchain Voting System</h1>
          <div className="account-section">
            <label className="account-label">Select Voting Account</label>
            <div className="account-dropdown">
              <select
                className="account-select"
                value={account}
                onChange={handleAccountChange}
              >
                {accounts.map((acc, index) => (
                  <option key={acc} value={acc}>
                    Account {index + 1}: {acc.slice(0, 6)}...{acc.slice(-4)}
                  </option>
                ))}
              </select>
              <div className="dropdown-arrow"></div>
            </div>
          </div>
        </div>
        <div className="candidate-container">
          {candidates.length > 0 ? (
            <ul className="candidate-list">
              {candidates.map((c, index) => (
                <li key={index} className="candidate-item">
                  <div className="candidate-info">
                    <strong>{c.name}</strong>
                    <span>({c.voteCount} votes)</span>
                  </div>
                  <button onClick={() => vote(c.id)} className="vote-button">
                    Vote
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="loading">Loading candidates...</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VotingApp;

