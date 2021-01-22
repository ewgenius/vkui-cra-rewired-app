import React from 'react';
import { ConfigProvider, AdaptivityProvider, AppRoot, Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

function App() {
  return (
    <ConfigProvider>
      <AdaptivityProvider>
        <AppRoot>
          <Button>test</Button>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;
