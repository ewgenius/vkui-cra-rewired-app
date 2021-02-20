import React, { useState } from "react";
import {
  ConfigProvider,
  AdaptivityProvider,
  AppRoot,
  SplitCol,
  SplitLayout,
  View,
  Panel,
  PanelHeader,
  Group,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Cell,
  IOS,
  WebviewType,
  PanelHeaderButton,
  PanelHeaderBack,
  Header,
  CellButton,
  Input,
  FormItem,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import { Icon24CheckCircleOn, Icon24Dismiss } from "@vkontakte/icons";
import { ReactNode } from "react";

interface ButtonMode {
  left: ReactNode;
  right: ReactNode;
  label: string;
}

const buttonModes: ButtonMode[] = [
  {
    left: null,
    right: null,
    label: "none | none",
  },
  {
    left: <PanelHeaderBack />,
    right: <PanelHeaderButton>Готово</PanelHeaderButton>,
    label: "[ < ] | [ text ]",
  },
  {
    left: <PanelHeaderButton>Отмена</PanelHeaderButton>,
    right: <PanelHeaderButton>Готово</PanelHeaderButton>,
    label: "[ text ] | [ text ]",
  },
  {
    left: <PanelHeaderButton>Отмена</PanelHeaderButton>,
    right: (
      <PanelHeaderButton>
        <Icon24Dismiss />
      </PanelHeaderButton>
    ),
    label: "[ text ] | [ x ]",
  },
  {
    left: <PanelHeaderBack />,
    right: null,
    label: "[ < ] | none",
  },
  {
    left: <PanelHeaderBack />,
    right: (
      <PanelHeaderButton>
        <Icon24Dismiss />
      </PanelHeaderButton>
    ),
    label: "[ < ] | [ x ]",
  },
];

export default function App() {
  const [modal, setModal] = useState<string | null>("modal1");
  const [buttonMode, setButtonMode] = useState<ButtonMode>(buttonModes[0]);
  const [title, setTitle] = useState("Пластиковая карта");
  return (
    <ConfigProvider platform={IOS} isWebView webviewType={WebviewType.INTERNAL}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout
            modal={
              <ModalRoot activeModal={modal} onClose={() => setModal(null)}>
                <ModalPage
                  id="modal1"
                  header={
                    <ModalPageHeader
                      left={buttonMode.left}
                      right={buttonMode.right}
                    >
                      {title}
                    </ModalPageHeader>
                  }
                >
                  <Group>
                    <FormItem top="Modal Title">
                      <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </FormItem>

                    {buttonModes.map((mode, i) => (
                      <Cell
                        key={i}
                        selectable
                        checked={mode.label === buttonMode.label}
                        onClick={() => setButtonMode(mode)}
                      >
                        {mode.label}
                      </Cell>
                    ))}
                  </Group>
                </ModalPage>
              </ModalRoot>
            }
          >
            <SplitCol>
              <View activePanel="panel1">
                <Panel id="panel1">
                  <PanelHeader>Panel</PanelHeader>
                  <Group>
                    <CellButton onClick={() => setModal("modal1")}>
                      Open Modal
                    </CellButton>
                  </Group>
                </Panel>
              </View>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}
