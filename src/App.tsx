import React, { FC, useCallback, useContext, useEffect, useState } from "react";
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
  IOS,
  PanelHeaderButton,
  Gallery,
  Root,
  PanelHeaderBack,
  AdaptivityProps,
  FixedLayout,
  Tabbar,
  TabbarItem,
  ModalCard,
  ANDROID,
  Card,
  Div,
  Spinner,
  SliderSwitch,
  WebviewType,
} from "@vkontakte/vkui";
import {
  Icon56UsersOutline,
  Icon56MentionOutline,
  Icon56MessageReadOutline,
  Icon28Services,
  Icon24Done,
} from "@vkontakte/icons";
import { Epic } from "@vkontakte/vkui/dist/components/Epic/Epic";
import { RootContext } from "./RootContext";
import { ReactNode } from "react";

const views = ["view 1", "view 2"];
const panels = ["panel 1", "panel 2", "panel 3"];
const modals = ["modal 1", "modal 2", "modal 3"];

const GalleryCard: FC<{}> = () => {
  return (
    <div style={{ marginBottom: "15px" }}>
      <Card style={{ height: "100%", overflow: "hidden" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: "0 0 0auto", width: "100%", height: "100%" }}>
            <div
              style={{
                width: "90%",
                height: 350,
                borderRadius: 20,
                backgroundColor: "red",
              }}
            ></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const ScrollGallery = withAdaptivity(
  ({ count, viewWidth }: { count: number } & AdaptivityProps) => {
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
        <HorizontalScroll
          showArrows={viewWidth && viewWidth >= ViewWidth.MOBILE}
          getScrollToLeft={(i) => i - 120}
          getScrollToRight={(i) => i + 120}
        >
          <div style={{ display: "flex" }}>
            {items.map((i) => (
              <HorizontalCell key={i} size="s" header="Промокот">
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
  },
  {
    viewWidth: true,
  }
);

interface NavigationProps {
  view: string | null;
  panel: string | null;
  modal: string | null;
  setView: (id: string) => void;
  setPanel: (id: string) => void;
  setModal: (id: string) => void;
  showAlert: VoidFunction;
  showSnackbar: VoidFunction;
}

const Navigation = ({
  view,
  panel,
  modal,
  setView,
  setPanel,
  setModal,
  showAlert,
  showSnackbar,
}: NavigationProps) => {
  return (
    <Group>
      <Group mode="plain">
        {views.map((i) => (
          <Cell
            key={`view-${i}`}
            disabled={i === view}
            style={
              i === view
                ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8,
                  }
                : {}
            }
            onClick={() => setView(i)}
          >
            {i}
          </Cell>
        ))}
      </Group>
      <Group mode="plain">
        {panels.map((i) => (
          <Cell
            key={`panel-${i}`}
            disabled={i === panel}
            style={
              i === panel
                ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8,
                  }
                : {}
            }
            onClick={() => setPanel(i)}
          >
            {i}
          </Cell>
        ))}
      </Group>
      <Group mode="plain">
        {modals.map((i) => (
          <Cell
            key={`panel-${i}`}
            disabled={i === modal}
            style={
              i === modal
                ? {
                    backgroundColor: "var(--button_secondary_background)",
                    borderRadius: 8,
                  }
                : {}
            }
            onClick={() => setModal(i)}
          >
            {i}
          </Cell>
        ))}
      </Group>
      <Group mode="plain">
        <Cell onClick={showAlert}>alert</Cell>
        <Cell onClick={showSnackbar}>snackbar</Cell>
      </Group>
    </Group>
  );
};

const App = withAdaptivity(
  ({ viewWidth }: any) => {
    const platform = usePlatform();
    const [view, setView] = useState(views[0]);
    const [panel, setPanel] = useState(panels[0]);
    const [modal, setModal] = useState<string | null>(null);
    const [popout, setPopout] = useState<any>(null);
    const [snackbar, setSnackbar] = useState<any>(null);

    const { setPlatform, setWebViewType, webviewType } = useContext(
      RootContext
    );

    const appSettings = (
      <>
        <Group mode="plain">
          <Button onClick={() => setPlatform(ANDROID)}>Android</Button>
          <Button onClick={() => setPlatform(IOS)}>iOS</Button>
          <Button onClick={() => setPlatform(VKCOM)}>VKCOM</Button>
        </Group>
        <Group mode="plain">
          <SliderSwitch
            onSwitch={(v) => setWebViewType(v as WebviewType)}
            activeValue={webviewType}
            options={[
              {
                name: "Internal",
                value: WebviewType.INTERNAL,
              },
              {
                name: "VK Apps",
                value: WebviewType.VKAPPS,
              },
            ]}
          />
        </Group>
      </>
    );

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
      <ModalRoot
        activeModal={modal}
        onClose={() => {
          console.log("closed form root");
          setModal(null);
        }}
      >
        <ModalPage
          id={modals[0]}
          onClose={() => {
            console.log("closed form modal");
            setModal(null);
          }}
          header={
            <ModalPageHeader
              left={<PanelHeaderBack />}
              right={
                <PanelHeaderButton onClick={() => setModal(null)}>
                  <Icon24Done />
                </PanelHeaderButton>
              }
            >
              Modal 1
            </ModalPageHeader>
          }
        >
          {platform !== VKCOM && <Separator />}

          <Group header={<Header>Group</Header>}>
            {appSettings}
            <FormItem>
              <Textarea placeholder="Описание" />
            </FormItem>
            <ScrollGallery count={15} />
          </Group>
          <Group header={<Header>Group + Group.plain</Header>}>
            <Group mode="plain">
              <CellButton onClick={() => setModal(modals[1])}>
                Modal 2
              </CellButton>
              <CellButton onClick={showAlert}>Alert</CellButton>
              <CellButton onClick={showSnackbar}>Snackbar</CellButton>
            </Group>
          </Group>
        </ModalPage>
        <ModalPage
          id={modals[1]}
          header={<ModalPageHeader>Modal 2</ModalPageHeader>}
        >
          <Separator />
          <Group>
            <Group mode="plain">
              <CellButton onClick={() => setModal(modals[0])}>
                Modal 1
              </CellButton>
            </Group>
            <Group mode="plain">
              <ScrollGallery count={20} />
            </Group>
          </Group>
        </ModalPage>
        <ModalCard
          id={modals[2]}
          onClose={() => setModal(null)}
          icon={
            <Avatar mode="app" src="https://robohash.org/image.png" size={72} />
          }
          header="Добавить игру «Загадки детства» в меню?"
          subheader="Игра появится под списком разделов на экране меню и будет всегда под рукой."
          actions={
            <Button size="l" mode="primary">
              Добавить в меню
            </Button>
          }
        />
      </ModalRoot>
    );

    const isDesktop = viewWidth && viewWidth >= ViewWidth.SMALL_TABLET;
    const hasHeader = platform !== VKCOM;

    const toggleSnackbar = useCallback(
      () => (snackbar ? setSnackbar(null) : showSnackbar()),
      [snackbar]
    );

    const navigationProps: NavigationProps = {
      view,
      panel,
      modal,
      setView,
      setModal,
      setPanel,
      showAlert,
      showSnackbar: toggleSnackbar,
    };

    const [cards, setCards] = useState<ReactNode[]>([<GalleryCard key="1" />]);
    const [loaded, setLoaded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setCards(
          cards.concat([
            <GalleryCard key="2" />,
            <GalleryCard key="3" />,
            <GalleryCard key="4" />,
            <GalleryCard key="5" />,
          ])
        );
      }, 1000);
    }, []); // eslint-disable-line

    const loadContent = () => {
      setLoading(true);
      setTimeout(() => {
        setLoaded(true);
        setLoading(false);
      }, 1000);
    };

    const content = (
      <Root id="1" activeView={view}>
        <View id={views[0]} activePanel={panel}>
          <Panel id={panels[0]}>
            <PanelHeader right={<Avatar size={36} />}>Panel 1</PanelHeader>
            <Group>
              {cards.length <= 1 && (
                <Div>
                  <Spinner />
                </Div>
              )}
              {cards.length > 1 && (
                <Div>
                  <Gallery
                    showArrows
                    slideWidth="90%"
                    align="right"
                    style={{ height: 150 }}
                  >
                    {cards}
                  </Gallery>
                </Div>
              )}
            </Group>
            {loading && !loaded && (
              <Group>
                <Div>
                  <Spinner />
                </Div>
              </Group>
            )}
            {loaded && !loading && (
              <>
                <ScrollGallery count={10} />
                <Group>
                  {!isDesktop && <Navigation {...navigationProps} />}

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
              </>
            )}
            {!loaded && !loading && (
              <Group>
                <CellButton onClick={loadContent}>Load Content</CellButton>
              </Group>
            )}
            {snackbar}
          </Panel>

          <Panel id={panels[1]}>
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setPanel(panels[0])} />}
              right={<Avatar size={36} />}
            >
              Panel 2
            </PanelHeader>
            <FixedLayout vertical="top">
              <div style={{ backgroundColor: "red", padding: 10 }}>
                fixed content
              </div>
            </FixedLayout>
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
          </Panel>

          <Panel id={panels[2]}>
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setPanel(panels[0])} />}
              right={<Avatar size={36} />}
            >
              Panel 3
            </PanelHeader>
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

        <View id={views[1]} activePanel="panel-2-1">
          <Panel id="panel-2-1">
            <PanelHeader
              left={<PanelHeaderBack onClick={() => setView(views[0])} />}
            >
              Test
            </PanelHeader>
            <Group>Test</Group>
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
          </Panel>
        </View>
      </Root>
    );

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
              <Group>{appSettings}</Group>
              <Navigation {...navigationProps} />
            </Panel>
          </SplitCol>
        )}

        <SplitCol
          animate={!isDesktop}
          spaced={isDesktop}
          maxWidth={isDesktop ? "560px" : "100%"}
        >
          {isDesktop ? (
            content
          ) : (
            <Epic
              tabbar={
                <Tabbar>
                  <TabbarItem>
                    <Icon28Services />
                  </TabbarItem>
                  <TabbarItem>
                    <Icon28Services />
                  </TabbarItem>
                  <TabbarItem>
                    <Icon28Services />
                  </TabbarItem>
                </Tabbar>
              }
              activeStory="1"
            >
              {content}
            </Epic>
          )}
        </SplitCol>
      </SplitLayout>
    );
  },
  {
    viewWidth: true,
  }
);

export default App;
