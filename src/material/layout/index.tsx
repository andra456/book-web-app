import React, {
  Fragment,
  useState,
  useEffect,
  lazy,
  ReactElement,
} from "react";
import "../../assets/style/globals.scss";
import "./_layout.scss";
import { Logo } from "../../assets/img/Images";

const Nav = lazy(() => import("./navigation"));

const SidePanels = lazy(() => import("./navigation/sidePanel"));

interface PropsWrappers {
  children: ReactElement;
  layout: string;
}

function Wrapper({ children, layout }: Readonly<PropsWrappers>) {
  const nav = layout !== "blank";
  const [active, setActive] = useState<boolean>(false);
  const [preload, setPreload] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setPreload(false);
    }, 2300);
  }, [children]);

  const activated = (e: boolean) => {
    setActive(e);
  };
  return (
    <Fragment>
      <div className={`preloader ${preload ? "active" : ""}`}>
        <div className="logo-center">
          <Logo className="handwriting play" />
        </div>
      </div>

      {layout !== "blank" ? (
        <div className={`constractor ${active ? "active-push" : ""}`}>
          {nav && (
            <Nav
              showSidebar={layout === "nosidebar"}
              active={active}
              onShowPushMenu={(e) => {
                activated(e);
              }}
            />
          )}

          <div className="wrap-container float-content">
            {layout === "sidebar" ? (
              <>
                <div className="panel-menu side-one">
                  <div className="sidemenu">
                    <div className="leading-panel">
                      <h2>
                        <Logo className="handwriting stay" />
                      </h2>
                    </div>

                    <SidePanels />
                  </div>
                </div>
                <div className="side-one"></div>
              </>
            ) : (
              ""
            )}
            <div className="side-two scroll">
              <div className="body-content">{children}</div>
            </div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Fragment>
  );
}

export default Wrapper;
