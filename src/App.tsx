import React, { useState } from "react";
import {
  usePlatform,
  withAdaptivity,
  SplitLayout,
  Snackbar,
  Alert,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Group,
  CellButton,
  Avatar,
  SplitCol,
  ViewWidth,
  Panel,
  VKCOM,
  PanelHeader,
  Cell,
  Separator,
  View,
  Placeholder,
  Button,
  FormItem,
  HorizontalCell,
  Textarea,
  Header,
  HorizontalScroll,
  Link,
} from "@vkontakte/vkui";
import {
  Icon56UsersOutline,
  Icon56MentionOutline,
  Icon56MessageReadOutline,
} from "@vkontakte/icons";

const panels = ["panel 1", "panel 2", "panel 3"];
const modals = ["modal 1", "modal 2"];

const Gallery = ({ count }: { count: number }) => {
  const items = [];
  for (let i = 0; i < count; i++) {
    items.push(i);
  }
  return (
    <Group
      header={
        <Header aside={<Link>Показать все</Link>}>Мини-приложения</Header>
      }
    >
      <HorizontalScroll style={{ backgroundColor: "red" }}>
        <div style={{ display: "flex", backgroundColor: "green" }}>
          {items.map((i) => (
            <HorizontalCell
              style={{ border: "1px solid black" }}
              key={i}
              size="s"
              header="Промокот"
            >
              <Avatar
                size={56}
                mode="app"
                src="https://sun9-54.userapi.com/c850536/v850536134/15096d/6806J7q6YwM.jpg"
              />
            </HorizontalCell>
          ))}
        </div>
      </HorizontalScroll>
    </Group>
  );
};

const App = withAdaptivity(
  ({ viewWidth }: any) => {
    const platform = usePlatform();
    const [panel, setPanel] = useState(panels[0]);
    const [modal, setModal] = useState<string | null>(null);
    const [popout, setPopout] = useState<any>(null);
    const [snackbar, setSnackbar] = useState<any>(null);

    const showSnackbar = () =>
      setSnackbar(
        <Snackbar
          onClose={() => setSnackbar(null)}
          after={<Avatar src="https://robohash.org/image.png" size={32} />}
        >
          Отправлено Ивану Барышеву
        </Snackbar>
      );

    const showAlert = () =>
      setPopout(<Alert header="Alert!" onClose={() => setPopout(null)} />);

    const modalRoot = (
      <ModalRoot activeModal={modal}>
        <ModalPage
          id={modals[0]}
          onClose={() => setModal(null)}
          header={<ModalPageHeader>Modal 1</ModalPageHeader>}
        >
          <Group>
            <div style={{ backgroundColor: "red", width: 100, height: 100 }} />
          </Group>
          <Group>
            <img
              alt=""
              src="https://sun9-54.userapi.com/c850536/v850536134/15096d/6806J7q6YwM.jpg"
            />
          </Group>
          <Group>
            <Avatar
              size={72}
              mode="app"
              src="https://sun9-54.userapi.com/c850536/v850536134/15096d/6806J7q6YwM.jpg"
            />
          </Group>
          <Group>
            <FormItem>
              <Textarea placeholder="Описание" />
            </FormItem>
          </Group>
          <Gallery count={15} />
          <Gallery count={2} />
          <Group>
            <div style={{ height: 320 }} />
          </Group>
          <Group>
            <div style={{ height: 320 }} />
          </Group>
          <Group>
            <div style={{ height: 320 }} />
          </Group>
          <Group>
            <div style={{ height: 320 }} />
          </Group>
          <Group>
            <CellButton onClick={() => setModal(modals[1])}>Modal 2</CellButton>
            <CellButton onClick={showAlert}>Alert</CellButton>
            <CellButton onClick={showSnackbar}>Snackbar</CellButton>
          </Group>
        </ModalPage>
        <ModalPage
          id={modals[1]}
          onClose={() => setModal(null)}
          header={<ModalPageHeader>Modal 2</ModalPageHeader>}
        >
          <Group>
            <CellButton onClick={() => setModal(modals[0])}>Modal 1</CellButton>
          </Group>
        </ModalPage>
      </ModalRoot>
    );

    const isDesktop = viewWidth && viewWidth >= ViewWidth.TABLET;
    const hasHeader = platform !== VKCOM;

    return (
      <SplitLayout
        style={{ justifyContent: "center" }}
        header={hasHeader && <PanelHeader separator={false} />}
        popout={popout}
        modal={modalRoot}
      >
        {isDesktop && (
          <SplitCol fixed width="280px" maxWidth="280px">
            <Panel>
              {hasHeader && <PanelHeader />}
              <Group>
                {panels.map((i) => (
                  <Cell
                    key={i}
                    disabled={i === panel}
                    style={
                      i === panel
                        ? {
                            backgroundColor:
                              "var(--button_secondary_background)",
                            borderRadius: 8,
                          }
                        : {}
                    }
                    onClick={() => setPanel(i)}
                  >
                    {i}
                  </Cell>
                ))}
                <Separator />
                <Cell onClick={() => setModal(modals[0])}>modal 1</Cell>
                <Cell onClick={() => setModal(modals[1])}>modal 2</Cell>
                <Cell onClick={showAlert}>alert</Cell>
                <Cell onClick={showSnackbar}>snackbar</Cell>
              </Group>
            </Panel>
          </SplitCol>
        )}

        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          width={isDesktop ? "560px" : "100%"}
          maxWidth={isDesktop ? "560px" : "100%"}
        >
          <View activePanel={panel}>
            <Panel id={panels[0]}>
              <PanelHeader right={<Avatar size={36} />}>Panel 1</PanelHeader>
              <Gallery count={10} />
              <Group>
                {!isDesktop && (
                  <>
                    <Cell onClick={() => setModal(modals[0])}>modal 1</Cell>
                    <Cell onClick={() => setModal(modals[1])}>modal 2</Cell>
                    <Cell onClick={showAlert}>alert</Cell>
                    <Cell onClick={showSnackbar}>snackbar</Cell>
                    <Separator />
                  </>
                )}

                <Placeholder
                  icon={<Icon56UsersOutline />}
                  header="Уведомления от сообществ"
                  action={<Button size="m">Подключить сообщества</Button>}
                >
                  Подключите сообщества, от которых Вы хотите получать
                  уведомления
                </Placeholder>
                <Separator />
                <Placeholder icon={<Icon56MentionOutline />}>
                  Введите адрес страницы в поле поиска
                </Placeholder>
              </Group>
              <Group>
                <div style={{ height: 320 }} />
              </Group>
              <Group>
                <div style={{ height: 320 }} />
              </Group>
              <Group>
                <div style={{ height: 320 }} />
              </Group>
              <Group>
                <div style={{ height: 320 }} />
              </Group>
              <Group>
                <div style={{ height: 320 }} />
              </Group>
              {snackbar}
            </Panel>

            <Panel id={panels[1]}>
              <PanelHeader right={<Avatar size={36} />}>Panel 2</PanelHeader>
              <Group>
                <Placeholder>Доступ запрещён</Placeholder>
                <Separator />
                <Placeholder
                  header="Находите друзей"
                  action={<Button size="m">Найти друзей</Button>}
                >
                  Здесь будут отображаться люди, которых вы добавите в друзья
                </Placeholder>
              </Group>
            </Panel>

            <Panel id={panels[2]}>
              <PanelHeader right={<Avatar size={36} />}>Panel 3</PanelHeader>
              <Group>
                <Placeholder
                  icon={<Icon56MessageReadOutline />}
                  action={
                    <Button size="m" mode="tertiary">
                      Показать все сообщения
                    </Button>
                  }
                >
                  Нет непрочитанных
                  <br />
                  сообщений
                </Placeholder>
              </Group>
            </Panel>
          </View>
        </SplitCol>
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default App;
