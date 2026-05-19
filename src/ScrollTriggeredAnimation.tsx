import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// 雛形のリスト
// 本来は別ファイルにまとめたほうがいいが、今回は一つのファイルにまとめる
const presidentList = [
  {
    name: "George Washington",
    term: "1789-1797",
    party: "Unaffiliated",
  },
  {
    name: "John Adams",
    term: "1797-1801",
    party: "Federalist",
  },
  {
    name: "Thomas Jefferson",
    term: "1801-1809",
    party: "Democratic-Republican",
  },
  {
    name: "James Madison",
    term: "1809-1817",
    party: "Democratic-Republican",
  },
  {
    name: "James Monroe",
    term: "1817-1825",
    party: "Democratic-Republican",
  },
  {
    name: "John Quincy Adams",
    term: "1825-1829",
    party: "Democratic-Republican",
  },
  {
    name: "Andrew Jackson",
    term: "1829-1837",
    party: "Democratic",
  },
  {
    name: "Martin Van Buren",
    term: "1837-1841",
    party: "Democratic",
  },
  {
    name: "William Henry Harrison",
    term: "1841-1841",
    party: "Whig",
  },
  {
    name: "John Tyler",
    term: "1841-1845",
    party: "Whig",
  },
  {
    name: "James K. Polk",
    term: "1845-1849",
    party: "Democratic",
  },
  {
    name: "Zachary Taylor",
    term: "1849-1850",
    party: "Whig",
  },
  {
    name: "Millard Fillmore",
    term: "1850-1853",
    party: "Whig",
  },
  {
    name: "Franklin Pierce",
    term: "1853-1857",
    party: "Democratic",
  },
  {
    name: "James Buchanan",
    term: "1857-1861",
    party: "Democratic",
  },
  {
    name: "Abraham Lincoln",
    term: "1861-1865",
    party: "Republican",
  },
  {
    name: "Andrew Johnson",
    term: "1865-1869",
    party: "Democratic",
  },
  {
    name: "Ulysses S. Grant",
    term: "1869-1877",
    party: "Republican",
  },
  {
    name: "Rutherford B. Hayes",
    term: "1877-1881",
    party: "Republican",
  },
  {
    name: "James A. Garfield",
    term: "1881-1881",
    party: "Republican",
  },
  {
    name: "Chester A. Arthur",
    term: "1881-1885",
    party: "Republican",
  },
  {
    name: "Grover Cleveland",
    term: "1885-1889",
    party: "Democratic",
  },
  {
    name: "Benjamin Harrison",
    term: "1889-1893",
    party: "Republican",
  },
  {
    name: "Grover Cleveland",
    term: "1893-1897",
    party: "Democratic",
  },
  {
    name: "William McKinley",
    term: "1897-1901",
    party: "Republican",
  },
  {
    name: "Theodore Roosevelt",
    term: "1901-1909",
    party: "Republican",
  },
  {
    name: "William Taft",
    term: "1909-1913",
    party: "Republican",
  },
  {
    name: "Woodrow Wilson",
    term: "1913-1921",
    party: "Democratic",
  },
  {
    name: "Warren G. Harding",
    term: "1921-1923",
    party: "Republican",
  },
  {
    name: "Calvin Coolidge",
    term: "1923-1929",
    party: "Republican",
  },
  {
    name: "Herbert Hoover",
    term: "1929-1933",
    party: "Republican",
  },
  {
    name: "Franklin D. Roosevelt",
    term: "1933-1945",
    party: "Democratic",
  },
  {
    name: "Harry S. Truman",
    term: "1945-1953",
    party: "Democratic",
  },
  {
    name: "Dwight D. Eisenhower",
    term: "1953-1961",
    party: "Republican",
  },
  {
    name: "John F. Kennedy",
    term: "1961-1963",
    party: "Democratic",
  },
  {
    name: "Lyndon B. Johnson",
    term: "1963-1969",
    party: "Democratic",
  },
  {
    name: "Richard Nixon",
    term: "1969-1974",
    party: "Republican",
  },
  {
    name: "Gerald Ford",
    term: "1974-1977",
    party: "Republican",
  },
  {
    name: "Jimmy Carter",
    term: "1977-1981",
    party: "Democratic",
  },
  {
    name: "Ronald Reagan",
    term: "1981-1989",
    party: "Republican",
  },
  {
    name: "George H. W. Bush",
    term: "1989-1993",
    party: "Republican",
  },
  {
    name: "Bill Clinton",
    term: "1993-2001",
    party: "Democratic",
  },
  {
    name: "George W. Bush",
    term: "2001-2009",
    party: "Republican",
  },
  {
    name: "Barack Obama",
    term: "2009-2017",
    party: "Democratic",
  },
  {
    name: "Donald Trump",
    term: "2017-2021",
    party: "Republican",
  },
  {
    name: "Joe Biden",
    term: "2021-2025",
    party: "Democratic",
  },
  {
    name: "Donald Trump",
    term: "2025-",
    party: "Republican",
  },
];


export const ScrollTriggeredAnimation = () => {
    const ListContainerRef = useRef<HTMLDivElement>(null);

    const variants = {
        invisible: { opacity: 0, y: 10 },
        visible: { opacity: 1, y:10 },
    };

    const [animationKey, setAnimationKey] = useState<number>(0);

    const resetAnimation = () => {
        setAnimationKey(prev => prev + 1);
    };

    useEffect(() => {
        if (ListContainerRef.current) {
            ListContainerRef.current.scrollTop = 0;
        }
    }, [animationKey]);

    return (
        <div>
            <h1 className="pageTitle">Scroll Triggered Animation</h1>
            <div className="contentsContainer">
                <div className="listContainer" ref={ListContainerRef} key={animationKey}>
                    <div className="listHeader">
                        <span className="listHeaderIndex">No.</span>
                        <span className="listHeaderName">Name</span>
                        <span className="listHeaderTerm">Term</span>
                        <span className="listHeaderParty">Party</span>                        
                    </div>
                    <ul className="listItems">
                        {presidentList.map((item, index) => (
                            <motion.li
                                key={index}
                                className="listItem"
                                variants={variants}
                                initial="invisible"
                                whileInView="visible"
                                viewport={{ amount: 0.4, once: true }}
                                transition={{
                                    opacity: { duration: 0.3 },
                                    y: { duration: 0.4 },
                                }}
                            >
                                <span className="listHeaderIndex">{index + 1}</span>
                                <span className="listHeaderName">{item.name}</span>
                                <span className="listHeaderTerm">{item.term}</span>
                                <span className="listHeaderParty">{item.party}</span>   
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <button onClick={resetAnimation} className="basicButton resetButton">
                    一番上に戻る
                </button>
            </div>
        </div>
    );
};