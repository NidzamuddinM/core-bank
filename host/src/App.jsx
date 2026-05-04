import React, { Suspense, lazy, useState } from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SingleOverbooking from "./pages/SingleOverbooking";
import { ThemeToggleProvider, useThemeToggle } from "./context/ThemeToggleContext";

const Remote1App = lazy(() => import("remote1/App"));
const Remote2App = lazy(() => import("remote2/App"));

const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    background: ${({ theme }) =>
      theme.mode === "light"
        ? "linear-gradient(135deg, #dff6f0 0%, #e8f4fd 40%, #f0e8ff 100%)"
        : "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #12091e 100%)"};
    background-attachment: fixed;
    color: ${({ theme }) => theme.textPrimary};
    transition: background-color 0.4s, color 0.25s;
    min-height: 100vh;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyLayout = styled.div`
  display: flex;
  flex: 1;
  margin-top: 64px;
`;

const SidebarSpace = styled.div`
  /* mirrors Sidebar width so content doesn't go under it */
  width: ${({ collapsed }) => (collapsed ? "68px" : "228px")};
  flex-shrink: 0;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const MainContent = styled.main`
  flex: 1;
  padding: 0 24px 32px;
  min-width: 0;
  min-height: calc(100vh - 64px);
`;

const MfeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-top: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MfeCard = styled.section`
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.55)"
      : "rgba(255,255,255,0.05)"};
  border: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(255,255,255,0.9)"
      : "rgba(255,255,255,0.1)"};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${({ theme }) =>
    theme.mode === "light"
      ? "0 8px 32px rgba(31,38,135,0.1), inset 0 1px 0 rgba(255,255,255,0.8)"
      : "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)"};
  transition: background 0.25s, box-shadow 0.25s;
`;

const MfeTitle = styled.h2`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) =>
    theme.mode === "light"
      ? "rgba(0,0,0,0.08)"
      : "rgba(255,255,255,0.08)"};
`;

const FallbackLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  color: ${({ theme }) => theme.textMuted};
  font-size: 14px;
`;

const ErrorMessage = styled.div`
  padding: 16px;
  background: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  color: #ff4d4f;
  font-size: 14px;
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorMessage>
          Failed to load microfrontend. Make sure the remote app is running.
        </ErrorMessage>
      );
    }
    return this.props.children;
  }
}

const pageLabel = {
  dashboard: "Dashboard",
  accounts: "Account Module",
  transactions: "Transaction Module",
  transfer: "Transfer",
  payments: "Payments",
  reports: "Reports",
  settings: "Settings",
};

const renderPage = (activePage) => {
  if (activePage === "single-overbooking") return <SingleOverbooking />;
  if (activePage === "dashboard") {
    return (
      <MfeGrid>
        <MfeCard>
          <MfeTitle>Remote 1 — Account Module</MfeTitle>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLoader>Loading...</FallbackLoader>}>
              <Remote1App />
            </Suspense>
          </ErrorBoundary>
        </MfeCard>
        <MfeCard>
          <MfeTitle>Remote 2 — Transaction Module</MfeTitle>
          <ErrorBoundary>
            <Suspense fallback={<FallbackLoader>Loading...</FallbackLoader>}>
              <Remote2App />
            </Suspense>
          </ErrorBoundary>
        </MfeCard>
      </MfeGrid>
    );
  }
  return (
    <MfeCard>
      <MfeTitle>{activePage.replace(/-/g, " ")}</MfeTitle>
      <FallbackLoader>Page coming soon...</FallbackLoader>
    </MfeCard>
  );
};

const AppInner = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { theme } = useThemeToggle();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageWrapper>
        <Navbar />
        <BodyLayout>
          <Sidebar
            activeKey={activePage}
            onSelect={setActivePage}
            onCollapse={setSidebarCollapsed}
          />
          <SidebarSpace collapsed={sidebarCollapsed} />
          <MainContent>
            {renderPage(activePage)}
          </MainContent>
        </BodyLayout>
      </PageWrapper>
    </ThemeProvider>
  );
};

const App = () => (
  <ThemeToggleProvider>
    <AppInner />
  </ThemeToggleProvider>
);

export default App;
