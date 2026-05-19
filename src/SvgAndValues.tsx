import { animate, motion, useMotionValue, useTransform, type Variants } from "motion/react";
import { useEffect, useState } from "react";

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

// タスク総数
const ALL_TASKS = 256;

// 未開始のタスク数
const NOT_STARTED_VALUE = 53;

// 進行中のタスク数
const IN_PROGRESS_VALUE = 40;

// 完了したタスク数
const COMPLETED_VALUE = 163;

// 進捗率を計算(完了数 / 総数)
const PROGRESS_RATE = COMPLETED_VALUE / ALL_TASKS;

export const SvgAndValues = () => {
    // アニメーション用の値を管理(初期は0)
    // useMotionValue でアニメーション可能な値を生成
    const progressRate = useMotionValue(0); // 進捗率(0-100％)
    const notStartedValue = useMotionValue(0); // 未開始タスク数
    const inProgressValue = useMotionValue(0); // 進行中タスク数
    const completedValue = useMotionValue(0); // 完了タスク数

    // 表示用の値を計算(小数点四捨五入にして整数変換)
    const rate = useTransform(() => Math.round(progressRate.get()));
    const notStartedCount = useTransform(() => Math.round(notStartedValue.get()));
    const inProgressCount = useTransform(() => Math.round(inProgressValue.get()));
    const completedCount = useTransform(() => Math.round(completedValue.get()));

    // SVGパス(円形の線)のアニメーション設定
    const drawPathVariants: Variants = {
        hidden: { pathLength: 0 }, // 初期状態：パスの長さが0(線が非表示)
        visible: {
            pathLength: PROGRESS_RATE, // 最終状態：進捗分だけパスを描画
            transition: { duration: 1.8, ease: EASE_OUT_QUART }, // 1.8秒でアニメーション
        },
    };

    // アニメーションを再実行するためのキー
    // key を変更することで、コンポーネントを再マウントしてアニメーションをリセット
    const [animationKey, setAnimationKey] = useState<number>(0);

    // Replayボタンがクリックされたときの処理
    const handleReplay = () => {
        // キーを変更してコンポーネントを再マウント(アニメリセット)
        setAnimationKey(prev => prev + 1);
        // すべてのmotion valueを0にリセット(アニメの開始位置に戻す)
        progressRate.set(0);
        notStartedValue.set(0);
        inProgressValue.set(0);
        completedValue.set(0);
    };

    useEffect(() => {
        // 各値を目標値までアニメーション
        // animate: motion value を指定した価までアニメーションさせる
        const progressRateAnimation = animate(progressRate, PROGRESS_RATE * 100, {
            duration: 1.8, // アニメーション時間(秒)
            ease: EASE_OUT_EXPO, // イージング関数(減速する動き)
        });
        const notStartedValueAnimation = animate(notStartedValue, NOT_STARTED_VALUE, {
            duration: 1.8,
            ease: EASE_OUT_EXPO,
        });
        const inProgressValueAnimation = animate(inProgressValue, IN_PROGRESS_VALUE, {
            duration: 1.8,
            ease: EASE_OUT_EXPO,
        });
        const complatedValueAnimation = animate(completedValue, COMPLETED_VALUE, {
            duration: 1.8,
            ease: EASE_OUT_EXPO,
        });
        return () => {
            progressRateAnimation.stop();
            notStartedValueAnimation.stop();
            inProgressValueAnimation.stop();
            complatedValueAnimation.stop();
        };
    }, [animationKey]);


    return (
        <div>
            <h1 className="pageTitle">SVG & VAlues</h1>
            <div className="contentsCounter">
                <div className="progressRateContainer" key={animationKey}>
                    <div className="donutChartContainer">
                        <div className="donutCart">
                            <div className="rateContainer">
                                <p className="rateTitle">Progress</p>
                                <div className="rateValueContainer">
                                    <motion.div className="rateValue">{rate}</motion.div>
                                    <div className="rateUnit">%</div>
                                </div>
                            </div>
                            <motion.svg
                                width="158"
                                height="158"
                                viewBox="0 0 158 158"
                                fill="none"
                                initial="hidden"
                                animate="visible"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                d="M79 15C114.346 15 143 43.6538 143 79C143 114.346 114.346 143 79 143C43.6538 143 15 114.346 15 79C15 43.6538 43.6538 15 79 15"
                                stroke="#e9e9e9"
                                stroke-width="20"
                                />
                                <motion.path
                                d="M79 15C114.346 15 143 43.6538 143 79C143 114.346 114.346 143 79 143C43.6538 143 15 114.346 15 79C15 43.6538 43.6538 15 79 15"
                                stroke="black"
                                stroke-width="30"
                                variants={drawPathVariants}
                                />
                            </motion.svg>
                        </div>
                    </div>
                    <div className="dataContainer">
                        <div className="dataItem">
                            <p className="dataItemTitle">Not Started</p>
                            <p className="dataItemValue">
                                <motion.span className="dateItemValueNumber">{notStartedCount}</motion.span>
                                <span className="dateItemValueUnit">/256</span>
                            </p>
                        </div>
                        <div className="dataItem">
                            <p className="dataItemTitle">In Progress</p>
                            <p className="dataItemValue">
                                <motion.span className="dateItemValueNumber">{inProgressCount}</motion.span>
                                <span className="dateItemValueUnit">/256</span>
                            </p>
                        </div>
                        <div className="dataItem">
                            <p className="dataItemTitle">Completed</p>
                            <p className="dataItemValue">
                                <motion.span className="dateItemValueNumber">{completedCount}</motion.span>
                                <span className="dateItemValueUnit">/256</span>
                            </p>
                        </div>
                    </div>
                </div>
                <button className="basicButton" onClick={handleReplay}>Replay</button>
            </div>
        </div>
    );
};