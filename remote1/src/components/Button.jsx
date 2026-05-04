import React from "react";
import styled, { css } from "styled-components";

const variants = {
  primary: css`
    background: ${({ theme }) => theme.accent || "#4ecca3"};
    color: #1a1a2e;
    border: none;
    &:hover {
      background: ${({ theme }) => theme.accentDark || "#3db892"};
    }
  `,
  secondary: css`
    background: transparent;
    color: ${({ theme }) => theme.accent || "#4ecca3"};
    border: 1px solid ${({ theme }) => theme.accent || "#4ecca3"};
    &:hover {
      background: ${({ theme }) => theme.accentBg || "rgba(78, 204, 163, 0.1)"};
    }
  `,
  danger: css`
    background: #ff4d4f;
    color: #ffffff;
    border: none;
    &:hover {
      background: #e53935;
    }
  `,
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ size }) =>
    size === "sm" ? "6px 14px" : size === "lg" ? "12px 28px" : "9px 20px"};
  font-size: ${({ size }) =>
    size === "sm" ? "12px" : size === "lg" ? "16px" : "14px"};
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  ${({ variant }) => variants[variant] || variants.primary}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  onClick,
  type = "button",
}) => {
  return (
    <StyledButton
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
