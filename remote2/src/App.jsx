import React from "react";
import styled from "styled-components";
import TransactionList from "./components/TransactionList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
`;

const ViewAll = styled.a`
  font-size: 12px;
  color: ${({ theme }) => theme.accent || "#4ecca3"};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;

  &:hover {
    text-decoration: underline;
  }
`;

const transactions = [
  {
    id: 1,
    description: "Transfer to Budi Santoso",
    amount: "-Rp 1,500,000",
    type: "debit",
    date: "03 May 2026",
    category: "Transfer",
  },
  {
    id: 2,
    description: "Salary Deposit",
    amount: "+Rp 12,000,000",
    type: "credit",
    date: "01 May 2026",
    category: "Income",
  },
  {
    id: 3,
    description: "PLN Electric Bill",
    amount: "-Rp 350,000",
    type: "debit",
    date: "30 Apr 2026",
    category: "Utilities",
  },
  {
    id: 4,
    description: "Refund - Tokopedia",
    amount: "+Rp 250,000",
    type: "credit",
    date: "28 Apr 2026",
    category: "Refund",
  },
];

const App = () => {
  return (
    <Wrapper>
      <Header>
        <ViewAll href="#">View all transactions →</ViewAll>
      </Header>
      <TransactionList transactions={transactions} />
    </Wrapper>
  );
};

export default App;
