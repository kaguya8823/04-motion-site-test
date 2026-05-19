import { motion, type AnimationDefinition } from "motion/react";
import { type MouseEvent, type SyntheticEvent, useRef, useState } from "react";


export const ModalDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    // HTMLのdialog要素の参照を保持
    const modalDialogRef = useRef<HTMLDialogElement>(null);

    // モーダルを開く関数
    const handleOpen = () => {
        modalDialogRef.current?.showModal();
        setIsOpen(true);
    };

    // モーダルを閉じる関数
    const handleClose = (
        e: SyntheticEvent<HTMLDialogElement> | MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();
        setIsOpen(false);
    };

    // dialog要素のbackdropをクリックしたときの処理
    const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
        // dialog要素のクリックイベントでbackdropをクリックした場合、
        // dialog内部については.modalContentInnerが覆っている、event.targetがdialog要素にはならない
        // つまり【backdropをクリックしたときのみ、e.target === e.currentTarget】となる
        if (e.target === e.currentTarget){
            modalDialogRef.current?.close();
        }
    };

    // モーダルアニメーションが完了したときに呼ばれる関数
    const handleAnimationComplete = (definition: AnimationDefinition) => {
        // exitアニメーション("hidden")が完了したら、実際にdialogを閉じる
        if (definition === "hidden") {
            modalDialogRef.current?.close();
        }
    };

    //モーダルアニメーションの定義
    const modalVariants = {
        cisible: {
            opacity: 1, // 不透明度1(表示)
            scale: 1, // スケール1'(元のサイズ)
            x: "-50%", // x位置: (中央揃えのため)
            y: "-50%", // x位置: (中央揃えのため)
        },
        hidden: {
            opacity: 0, // 不透明度0(透明)
            scale: 0.9, // スケール0.9(少し小さく)
            x: "-50%", // x位置: (中央揃えのため)
            y: "-50%", // x位置: (中央揃えのため)
        }
    };

    // オーバーレイ(背景)のアニメーション定義
    const  backdropVariants = {
        visible: { opacity: 1, visibility: "visible" },
        hidden: { opacity: 0, visibility: "hidden" },
    };

  return (
    <div>
        <div className="contentsContainer">
            <button className="basicButton" onClick={handleOpen}>
                click 3:モーダル
            </button>
            <div>
                <motion.div
                    className="modalBackdrop"
                    variants={backdropVariants}
                    initial="hidden"
                    animate={isOpen ? "visible" : "hidden" }
                    transition={{ duration: 0.2 }}
                />
                <motion.dialog
                    className="modalContent"
                    variants={modalVariants}
                    animate={isOpen ? "visible" : "hidden" }
                    transition={{ duration: 0.2 }}
                    ref={modalDialogRef}
                    onAnimationComplete={handleAnimationComplete}
                    onClick={handleBackdropClick}
                    onCancel={e => handleClose(e)}
                >
                    <div className="modalContentInner">
                    <h2>Modal Dialog</h2>
                    <p>This is the content of the modal dialog.</p>
                    <button className="basicButton" onClick={handleClose}>
                        Close
                    </button>
                    </div>
                </motion.dialog>
            </div>
        </div>
    </div>
  );
};

export default ModalDialog
