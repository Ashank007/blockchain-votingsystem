// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => bool) public hasVoted;
    uint public candidatesCount;

    event VoteCast(uint indexed candidateId, address indexed voter);

    constructor() {
        addCandidate("BJP");
        addCandidate("CONGRESS");
	addCandidate("AAP");
	addCandidate("NOTA");
    }

    function addCandidate(string memory _name) private {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function vote(uint _candidateId) public {
        require(!hasVoted[msg.sender], "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate.");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        emit VoteCast(_candidateId, msg.sender); // Emit event
    }

    function getCandidateVotes(uint _candidateId) public view returns (uint) {
        return candidates[_candidateId].voteCount;
    }
}

