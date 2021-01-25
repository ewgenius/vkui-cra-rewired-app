import React from 'react';
import { ConfigProvider, AdaptivityProvider, AppRoot, Button, PanelHeaderBack } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Button>test</Button>
          <PanelHeaderBack />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
