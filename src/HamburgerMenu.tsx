import { AnimatePresence, motion, stagger } from "motion/react";
import { useState } from "react";
import arrowBack from "./assets/arrow_back.svg";
import menu from "./assets/menu.svg";

// CSS での修正が必要なので、App.css に記載
// iconが必要なので、assets 内に添付

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

// ドロップダウンメニュー
const MENU_ITEMS = [
    {name: "Home",},
    {name: "About",},
    {name: "Works",},
    {name: "Blog",},
    {name: "Contact",},
];

export const HamburgerMenu = () => {
    const [isOpne, setIsOpen] = useState(false);

    // ハンバーガーメニューをトグルする関数
    const handleOpen = () => {
        setIsOpen(true);
    };

    // ハンバーガーメニューを閉じる関数
    const handleClose = () => {
        setIsOpen(false);
    };

    // ハンバーガーメニュー内のアイテムのアニメーション定義
    const variants = {
        open: {
            transition: {
                // stagger: 子要素を順番にアニメーションさせる
                // 0.08秒間隔で、最初の要素は0.2秒後に開始
                delayChildren: stagger(0.08, { startDelay: 0.2 }),
                ease: EASE_OUT_QUART,
                duration: 0.5,
            },
        },
    };

    // メニュー項目のアニメーション定義
    const buttonVariants = {
        open: { opacity: 1, x: 0 },
        closed: {opacity: 0, x: "-25" },
    };

    // メニューコンテンツのアニメーション
    const menuContentVariants = {
        open: { opacity: 1, x: 0 },
        closed: {opacity: 0, x: "-100%" },
    };

    // メニューバックドロップのアニメーション定義
    const backdropVariants = {
        open: { opacity: 1, transition: { ease: EASE_OUT_QUART, duration: 0.5, delay: 0.1} },
        closed: {opacity: 0, transition: { ease: EASE_OUT_QUART, duration: 0.5 } },
    };

    return (
        <div>
            <h1 className="pageTitle">Hamburger Menu</h1>
            <div className="contentsContainer">
                <div className="hambergerMenuContainer">
                    <button className="basicButton hamburgerButton" onClick={handleOpen} aria-label="Menu">
                        <img src={menu} alt="" width={24} height={24} className="hamburgerButtonIcon" />
                    </button>
                    <AnimatePresence>
                        {isOpne && (
                            <>
                                <motion.div
                                    className="menuContent"
                                    variants={menuContentVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    transition={{ ease: EASE_OUT_QUART, duration: 0.5 }}
                                >
                                    <button className="closeButton" onClick={handleClose} aria-label="Close">
                                        <img src={arrowBack} alt="close" width={16} height={16} />
                                    </button>
                                    <motion.div
                                        className="menuList"
                                        variants={variants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        role="menu"
                                    >
                                        {MENU_ITEMS.map(item => (
                                            <motion.button
                                                key={item.name}
                                                className="menuItem"
                                                role="menuitem"
                                                onClick={handleClose}
                                                variants={buttonVariants}
                                                transition={{ ease: EASE_OUT_QUART, duration: 0.5}}
                                            >
                                                {item.name}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                </motion.div>
                                <motion.div
                                    className="menuBackdrop"
                                    variants={backdropVariants}
                                    initial="closed"
                                    animate="open"
                                    exit="closed"
                                    onClick={handleClose}
                                >
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};