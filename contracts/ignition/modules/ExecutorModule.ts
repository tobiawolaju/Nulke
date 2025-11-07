import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("ExecutorModule", (m) => {
  const executor = m.contract("Executor", []);

  return { executor };
});
