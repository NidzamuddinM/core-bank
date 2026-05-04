import React from "react";
import styled from "styled-components";
import AccountCard from "./components/AccountCard";
import Button from "./components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }) => theme.bgCard || "transparent"};
  transition: background 0.25s;
`;

const accounts = [
  {
    id: 1,
    type: "Savings Account",
    number: "**** **** 4821",
    balance: "Rp 24,500,000",
    currency: "IDR",
    status: "active",
  },
  {
    id: 2,
    type: "Current Account",
    number: "**** **** 9034",
    balance: "Rp 8,750,000",
    currency: "IDR",
    status: "active",
  },
];

const App = () => {
  return (
    <Wrapper>
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
      <Button variant="primary" onClick={() => alert("Open new account")}>
        + Open New Account
      </Button>
    </Wrapper>
  );
};

export default App;
