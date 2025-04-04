import React, { useState, useEffect } from "react";
import Web3 from "web3";
import VotingABI from "../Voting.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update if redeployed

const VotingApp = () => {
  const [account, setAccount] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await web3Instance.eth.getAccounts();
          const contractInstance = new web3Instance.eth.Contract(VotingABI.abi, CONTRACT_ADDRESS);

          setWeb3(web3Instance);
          setAccount(accounts[0]);
          setContract(contractInstance);

          const netId = await web3Instance.eth.net.getId();
          console.log("Connected network ID:", netId); // Should be 31337

          const code = await web3Instance.eth.getCode(CONTRACT_ADDRESS);
          console.log("Contract code exists:", code !== "0x");

          const candidatesCount = await contractInstance.methods.candidatesCount().call();
          console.log("Candidates count:", candidatesCount);

          let candidatesList = [];
          for (let i = 1; i <= candidatesCount; i++) {
            let candidate = await contractInstance.methods.candidates(i).call();
            console.log("Candidate:", candidate);
            candidatesList.push(candidate);
          }
          setCandidates(candidatesList);
        } else {
          alert("Please install MetaMask.");
        }
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
      // Refresh candidates after voting
      const candidatesCount = await contract.methods.candidatesCount().call();
      let candidatesList = [];
      for (let i = 1; i <= candidatesCount; i++) {
        let candidate = await contract.methods.candidates(i).call();
        candidatesList.push(candidate);
      }
      setCandidates(candidatesList);
    } catch (error) {
      alert("Error while voting. You may have already voted.");
      console.error("Vote failed:", error);
    }
  };

  return (
    <div>
      <h1>Blockchain Voting System</h1>
      <p>Connected Account: {account}</p>
      <ul>
        {candidates.map((c, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            <strong>{c.name}</strong> - {c.voteCount} votes
            <button onClick={() => vote(c.id)} style={{ marginLeft: "10px" }}>
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotingApp;

