import { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

// motion
import { motion } from "motion/react";

// constants
import { APPNAME, navLists } from "../../../Constant";

// icons
import { GitlabFilled, MenuOutlined } from "@ant-design/icons";


// style
import { colors, styles } from "../../../style";


// components
import DarkLightSwitch from "../../DarkLightSwitch";

const DeskTopNav = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const location = useLocation();

  // 自动根据 hash 激活 section（刷新后依然识别）
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
    }
  }, [location]);

  return (
    <nav className={`hidden md:flex w-full items-center justify-between ${styles.paddingX}`}>
      {/* LOGO */}
      <NavLink to="/" className={`flex items-center gap-2 ${colors.text.primary}`}>
        <GitlabFilled className=" text-2xl" />
        <span className="text-2xl font-bold ">{APPNAME}</span>
      </NavLink>


      {/* NAV RIGHT */}
      <div className="flex items-center gap-7 justify-end">
        <DarkLightSwitch />


        {/* MOBILE MENU ICON */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="text-white text-lg cursor-pointer select-none max-sm:block hidden"
        >
          <MenuOutlined />
        </motion.div>
      </div>
    </nav>
  );
};

export default DeskTopNav;
