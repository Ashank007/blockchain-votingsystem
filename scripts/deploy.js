async function main() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();
    await voting.waitForDeployment(); // ✅ THIS LINE FIXES IT

    console.log("Contract deployed to:", voting.target); // ✅ Use .target to get address
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});


