import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingABI from "../Voting.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update after redeployment

const VotingApp = () => {
  const [account, setAccount] = useState("");
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
	    const accounts = await web3Instance.eth.getAccounts();
	    const contractInstance = new web3Instance.eth.Contract(VotingABI.abi, CONTRACT_ADDRESS);

	    setWeb3(web3Instance);
	    setAccount(accounts[0]);
	    setContract(contractInstance);

	    console.log("Connected to Hardhat local node");
	    console.log("Using account:", accounts[0]);

	    await fetchCandidates(contractInstance);

	    contractInstance.events.VoteCast()
	      .on("data", (event) => {
		console.log("Vote cast event:", event);
		fetchCandidates(contractInstance);
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
      alert("Vote successful!");
      await fetchCandidates(contract); // Immediate update
    } catch (error) {
      alert("Error while voting. You may have already voted.");
      console.error("Vote failed:", error);
    }
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
            height: 100vh;
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
            padding: 20px;
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
            margin: 0 0 10px 0;
          }
          .account {
            font-size: 16px;
            color: #4b5563;
            word-break: break-all;
          }
          .account span {
            font-weight: 600;
            color: #111827;
          }
          .candidate-container {
            width: 100%;
            max-width: 800px;
          }
          .candidate-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .candidate-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 15px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .candidate-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .candidate-info {
            color: #1f2937;
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
            padding: 10px 20px;
            background-color: #10b981;
            color: #ffffff;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s ease;
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
          }
        `}
      </style>
      <div className="app-container">
        <div className="voting-header">
          <h1 className="title">Blockchain Voting System</h1>
          <p className="account">
            <span>Connected Account:</span> {account || "Not connected"}
          </p>
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
    </div>
  );
};

export default VotingApp;

