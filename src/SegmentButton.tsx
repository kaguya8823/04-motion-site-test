import { motion , type Variants } from "motion/react";
import { useState } from "react";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

// セグメントボタンのリスト(定数として定義)
const SEGMENT_BUTTON_LIST = ["dialy", "weekly", "monthly", "yearly"] as const;

export const SegmentButton = () => {
    const [activeSegment, setActiveSegment] = useState<(typeof SEGMENT_BUTTON_LIST)[number]>("dialy");

    // セグメントボタンがクリックされたときの処理
    const handleSegmentClick = (segment: (typeof SEGMENT_BUTTON_LIST)[number]) => {
        setActiveSegment(segment);
    };

    // 背景アニメーションの定義
    const variants: Variants = {
        dialy: {
            x: 0, // 最初のボタンの位置(X座標0)
        },
        weekly: {
            x: 120, // 2番めのボタンの位置(X座標120PX)
        },
        monthly: {
            x: 240, // 3番めのボタンの位置(X座標240PX)
        },
        yearly: {
            x: 360, // 4番めのボタンの位置(X座標360PX)
        },
    };

    return (
        <div>
            <div className="contentsContainer">
                <div className="segmentButtonContainer">
                    <motion.div
                        className="segmentButtonBackground"
                        variants={variants}
                        animate={activeSegment}
                        transition={{ duration: 0.3, ease: EASE_OUT_QUART }}
                    >
                    </motion.div>
                    {SEGMENT_BUTTON_LIST.map(segment => (
                        <button
                            className="segmentButton"
                            onClick={() => handleSegmentClick(segment)}
                            key={segment}
                        >
                            {segment}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
