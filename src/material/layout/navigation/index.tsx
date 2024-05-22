import React, { useState, useEffect, useCallback } from "react";

import _ from "lodash";

import { HiMenuAlt3 } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { MdFavoriteBorder } from "react-icons/md";
import { Logo } from "../../../assets/img/Images";

type Props = {
  active: boolean;
  onShowPushMenu: (text: boolean) => void;
  showSidebar: boolean;
};

const Nav: React.FC<Props> = ({ onShowPushMenu, showSidebar, active }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [inpSearch, setInpSearch] = useState<string>("");

  const delayedSearch = useCallback(
    _.debounce((value) => {
      setInpSearch(value);
    }, 1000),
    []
  );

  const handleSearch = (e: any) => {
    let value = e.target.value;
    if (e.key === "Enter") {
      setInpSearch(value);
    } else {
      delayedSearch(value);
    }
    setSearchValue(value);
  };

  useEffect(() => {
    // create fetch dispatch / context stored;
  }, [inpSearch]);

  return (
    <div className="top-head-menu">
      <div className={`wrap-container flex-menu ${showSidebar ? "gap" : ""}`}>
        <div className="side-one">
          {showSidebar && (
            <div className="logo">
              <Logo className="handwriting stay" />
            </div>
          )}
        </div>
        <div className="side-two spare-menu">
          <div className="ui action fluid input">
            <IoSearchOutline />
            <input
              value={searchValue}
              type="text"
              onChange={(e) => handleSearch(e)}
              onKeyPress={(e) => handleSearch(e)}
              placeholder="Search..."
            />
          </div>

          <div className="left-ico">
            <div className="ico squard">
              <MdFavoriteBorder />
            </div>
            <div className="ico avatar round">A</div>
          </div>

          <button
            className="menu-mobile"
            onClick={() => onShowPushMenu(!active)}>
            <HiMenuAlt3 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
