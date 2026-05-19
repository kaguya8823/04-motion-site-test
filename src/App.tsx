import { motion } from 'motion/react';
import { RippleButton } from './RippleButton';
import { ModalDialog } from './ModalDialog';
import { Accordion } from './Accordion';
import { SegmentButton } from './SegmentButton';
import { ScrollTriggeredAnimation } from './ScrollTriggeredAnimation';
import { HamburgerMenu } from './HamburgerMenu';
import { SvgAndValues } from './SvgAndValues';



function App() {
  return (
    <div>
      <h1>Motion Site Test</h1>
      <div className="contentsContainer">
        <motion.button
        className="basicButton activeFbButton"
        // whileTap: ボタンが押されている間のアニメーション
        // scale: 0.95に縮小
        whileTap={{ scale: 0.95 }}
        transition={{
          // アニメーション時間: 0.1秒
          duration: 0.1,
        }}
        >
        Click 1: すると少し縮む
      </motion.button>

      <RippleButton />
      <ModalDialog />
      <Accordion />
      <SegmentButton />
      <ScrollTriggeredAnimation />
      <HamburgerMenu />
      <SvgAndValues />
      </div>


    </div>
  )
}

export default App
