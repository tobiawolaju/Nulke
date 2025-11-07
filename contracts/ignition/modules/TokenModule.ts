import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TokenModule", (m) => {
  const supply = m.getParameter("supply", 1000000n * 10n ** 18n);
  const recipient = m.getParameter("recipient");

  const token = m.contract("Token", [supply, recipient]);

  return { token };
});
