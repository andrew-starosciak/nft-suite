import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy } = deployments;
  const { deployer, adminAddress, treasuryAddress, owner } =
    await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("CheekyCorgi", {
    from: deployer,
    args: ["CheekyCorgi", "CC", "", adminAddress, treasuryAddress, owner],
  });

  const [treasury, tester] = await hre.ethers.getSigners();

  console.log(treasury, tester);
  console.log("CHAIN ID", chainId);
  console.log(deployer, adminAddress, treasuryAddress, owner);
  await hre.ethers.getContract("CheekyCorgi", deployer);
};

export default func;
func.tags = ["Full"];
