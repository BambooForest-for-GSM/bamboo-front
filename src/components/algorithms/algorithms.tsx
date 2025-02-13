import style from "./style.module.scss";
import Header from "./item/headerPresenter";
import { algorithmsProps } from "./algorithmsContainer";
import { hasTokenState, algorithmFilterState } from "recoil/atom";
import { useRecoilValue } from "recoil";
import { Leaf } from "assets/svg";
import { useState } from "react";
import emojiController from "utils/api/emoji";
import { AxiosResponse } from "axios";
import { emojiRes } from "types/api";
import SpinnerBar from "components/spinner/spinnerPresenter";

const Algorithms: React.FC<algorithmsProps> = (p: algorithmsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isAdmin, isLogin } = useRecoilValue(hasTokenState);
  const AlgorithmFilter = useRecoilValue(algorithmFilterState);
  const [emojiCnt, setEmojiCnt] = useState<number>(p.data.emojiCount);
  const [isEmojiClick, setEmojiClick] = useState<boolean>(p.data.isClicked);
  const idx = p.data.idx;
  const addEmoji = () => {
    emojiController
      .addEmoji(isLogin, idx)
      .then((res: AxiosResponse<emojiRes> | void) => {
        if (res?.status !== 200) {
          setEmojiClick(false);
          setEmojiCnt(emojiCnt);
        }
      });
  };

  const deleteEmoji = () => {
    emojiController
      .deleteEmoji(isLogin, idx)
      .then((res: AxiosResponse<emojiRes> | void) => {
        if (res?.status !== 200) {
          setEmojiClick(true);
          setEmojiCnt(emojiCnt);
        }
      });
  };

  const onEmojiClick = () => {
    if (isEmojiClick) {
      setEmojiCnt(emojiCnt - 1);
      deleteEmoji();
    } else {
      setEmojiCnt(emojiCnt + 1);
      addEmoji();
    }
    setEmojiClick(!isEmojiClick);
  };

  return (
    <article className={style.algorithmsBox}>
      {isLoading && <SpinnerBar background={true} />}
      <Header
        idx={idx}
        status={AlgorithmFilter}
        createdAt={p.data.createdAt}
        number={p.data.algorithmNumber}
        tag={p.data.tag}
        content={p.data.content}
        title={p.data.title}
        setIsLoading={setIsLoading}
      />
      <h4>{p.data.title}</h4>
      <p>{p.data.content}</p>
      {isAdmin &&
        {
          REJECTED: (
            <>
              <h4>거절 사유</h4> <p>{p.data.reason}</p>
            </>
          ),
          REPORTED: (
            <>
              <h4>신고 사유</h4> <p>{p.data.reason}</p>
            </>
          ),
          PENDING: <></>,
          ACCEPTED: <></>,
        }[AlgorithmFilter]}
      <div>
        <button className={style.emojiBtn} onClick={onEmojiClick}>
          <Leaf isClick={isEmojiClick} />
          <span>{emojiCnt}</span>
        </button>
      </div>
    </article>
  );
};

export default Algorithms;
