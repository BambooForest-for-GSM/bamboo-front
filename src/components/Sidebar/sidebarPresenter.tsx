import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import s from "./sidebar.module.scss";
import HeadingPresenter from "components/heading/headingPresenter";
import { tags } from "./sidebarContainer";
import {
  useGetQuestion,
  useCreatePost,
  useGetCount,
  transfer,
} from "./sidebarContainer";
import { hasTokenState } from "recoil/atom";

const SideBar: React.FC = () => {
  const { isAdmin } = useRecoilValue(hasTokenState);
  const [tagClicked, setTagClicked] = useState<boolean>(false);
  const question = useGetQuestion();
  const [
    tryCreatePost,
    setTitle,
    setContent,
    setTag,
    setQuestionAnswer,
    title,
    content,
    tag,
    questionAnswer,
  ] = useCreatePost(
    question ?? {
      id: "",
      question: "",
    }
  );
  const count = useGetCount();
  const tagCasement = () => {
    setTagClicked(true);
    setTimeout(() => {
      setTagClicked(false);
    }, 100);
  };

  return isAdmin ? (
    <section>
      <HeadingPresenter
        heading={"모두에게 하고픈 말,"}
        explanation={"무엇인가요?"}
      />
      <article className={s.admin}>
        <h3>알고리즘 현황</h3>
        <br />
        {React.Children.toArray(
          count?.map((item: { _id: string; count: number }) => (
            <>
              <h3>{transfer[item._id]} 알고리즘</h3>
              <p>{item.count}개</p>
            </>
          ))
        )}
      </article>
    </section>
  ) : (
    <section>
      <HeadingPresenter
        heading={"모두에게 하고픈 말,"}
        explanation={"무엇인가요?"}
      />
      <div className={s.inputWrapper}>
        <input
          className={s.title}
          placeholder="제목을 입력하세요."
          autoFocus={true}
          onChange={({ target: { value } }) => {
            setTitle(value);
          }}
          value={title}
        />
        <button className={s.tagBtn}>
          {!tag ? "태그" : tag}
          <ul className={tagClicked ? s.tagClose : s.tagOpen}>
            {React.Children.map(tags, child => (
              <li
                onClick={() => {
                  setTag(child);
                  tagCasement();
                }}
              >
                #{child}
              </li>
            ))}
          </ul>
        </button>
        <input
          className={s.fullInput}
          placeholder={`Q. ${question?.question ?? "질문을 준비 중입니다."}
            `}
          onChange={({ target: { value } }) => {
            setQuestionAnswer(value);
          }}
          value={questionAnswer}
        />
        <div className={s.textareaBox}>
          <textarea
            className={s.fullTextarea}
            placeholder="내용을 입력하세요."
            onChange={({ target: { value } }) => {
              setContent(value);
            }}
            value={content}
          ></textarea>
          <button onClick={tryCreatePost} className={s.submitBtn}>
            전송
          </button>
        </div>
      </div>
    </section>
  );
};

export default SideBar;