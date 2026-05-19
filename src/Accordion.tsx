import { AnimatePresence, motion, type AnimationDefinition } from "motion/react";
import { type MouseEvent, useRef, useState } from "react";

export const Accordion = () => {
    // アコーディオンの開閉状態を管理するstate
    const [isOpen, setIsOpen] = useState(false);

    // HTMLのdatails要素への参照を保持
    const detailsRef = useRef<HTMLDetailsElement>(null);

    // アコーディオンをクリックしてトグル(画面切り替え)する関数
    const handleClick = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const detailsElement = detailsRef.current;
        if (!detailsElement) {
            return;
        }
        // アコーディオンopen
        if (!detailsElement.open) {
            detailsElement.open = true;
            setIsOpen(true);
        } else {
            // アコーディオンclose
            setIsOpen(false);
        }
    };

    // アコーディオンをトグルするときに呼ばれる関数
    // ページ内検索などで受動的にアコーディオンが開閉するときに呼ばれる関数
    const handleToggle = () => {
        const detailsElement = detailsRef.current;
        if (detailsElement && detailsElement.open) {
            setIsOpen(true);
        }
    };

    // アコーディオンアニメーションが完了したときに呼ばれる関数
    const handleAnimationComplete = (definition: AnimationDefinition) => {
        // closedしたら実際にdetails要素を閉じる
        if (definition === "closed") {
            if (detailsRef.current) {
                detailsRef.current.open = false;
            }
        }
    };

    // アコーディオンアニメーションの定義
    const variants = {
        open: {
            opacity: 1,
            height: "auto",
        },
        closed: {
            opacity: 0,
            height: 0,
        },
    };

    const iconVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 },
    };

    return (
        <div>
            <div className="contentsContainer">
                <details ref={detailsRef} className="accordion" onToggle={handleToggle}>
                    <summary onClick={handleClick} className="accordionSummary">
                        click 4:このボタンはなんですか？
                        <AnimatePresence initial={false}>
                            {isOpen ? (
                            <motion.span
                                className="accordinIcon"
                                variants={iconVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                transition={{ duration: 0.3 }}
                                key="closed"
                            >
                                開
                            </motion.span>
                        ) : (
                            <motion.span
                                className="accordionIcon"
                                variants={iconVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                                transition={{ duration: 0.3 }}
                                key="open"
                            >
                                閉
                            </motion.span>
                        )}
                        </AnimatePresence>
                    </summary>
                    <motion.div
                        className="accordionContent"
                        variants={variants}
                        initial="closed"
                        animate={isOpen ? "open" : "closed"}
                        transition={{ duration: 0.3 }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <p className="accordinText">
                            このボタンは、クリックすることににより、内部に長文を隠して置くことができる機能です。
                            ボタンをタイトルにして、それをクリックすることにより、その説明文を記述するなどといった機能をするのが一般的です。
                            非常にユーザービリティがよく、わかりやすい機能だと思われます。
                        </p>
                    </motion.div>
                </details>
            </div>
        </div>
    );
};