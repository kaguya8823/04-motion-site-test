import { motion } from 'motion/react';
import { type MouseEvent, useRef, useState } from 'react';


// 2: リップルエフェクトのアニメーションキーを管理する状態
 export const  RippleButton = () => {
  // リップルエフェクトのアニメーションを実行する
  // キーを変更すると、motion 要素を再マウントしてアニメをリセット
  const [rippleAnimationKey, setRippleAnimationKey] = useState(0);

  // クリックXY座標を管理する状態
  const [clickX, setClickX] = useState(0);
  
  // クリックY座標を管理する状態
  const [clickY, setClickY] = useState(0);

  // ボタン要素の参照を保持
  const buttonElementRef = useRef<HTMLButtonElement>(null);

  // ボタンクリック時の処理
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // クリック位置をボタン内の座標に変換
    // e.clickX: 画面全体のクリックX座標
    // getBoundingClientRect().x: ボタンの左端のX座標
    // 差分を取ることでボタン内での位置を取得
    setClickX(e.clientX - (buttonElementRef.current?.getBoundingClientRect().x ?? 0));
    setClickY(e.clientY - (buttonElementRef.current?.getBoundingClientRect().y ?? 0));
    // キーを変更してリップルエフェクトのアニメーションをリセット
    setRippleAnimationKey((prev) => prev + 1);
  };


return (
    <div>
       <div className="contentsContainer">
        <button className="basicButton rippleButton" ref={buttonElementRef} onClick={handleClick}>
          Click 2:クリックするとボタンが波打つ
          {rippleAnimationKey > 0 && (
            <motion.span style={{ left: clickX, top: clickY }} className="rippleWrapperElement">
              <motion.span
                key={rippleAnimationKey}
                className="rippleEffectElement"
                initial={{ opacity: 3, scale: 0 }} // 初期状態: 不透明度1、スケール0（点）
                animate={{ opacity: 0, scale: 3 }} // アニメーション後: 不透明度0、スケール1（拡大）
                transition={{
                  duration: 1.0, // アニメーション時間: 0.5秒
                  ease: "easeOut", // イージング関数（減速する動き）
                }}
              ></motion.span>
            </motion.span>
          )}
        </button>
      </div>
    </div>
  );
 };
