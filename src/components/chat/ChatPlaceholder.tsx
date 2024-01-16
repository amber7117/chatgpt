import React from "react";
import AddTokenModal from "./../auth/AddTokenModal";
import Link from "next/link";
import GithubStar from "./../misc/GithubStar";

type Props = {};

export default function ChatPlaceholder({}: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="max-w-3xl p-4 text-center text-primary">
        <h1 className="text-4xl font-medium">GPT-4 Playground</h1>
        <p className="mt-4 text-lg">
            ChatGPT 4.0+ 请自行添加你的API Key
        </p>
        <div className="m-4 flex items-center justify-center">
          <AddTokenModal />
        </div>
        <p className="mt-4 text-lg">
          更多玩法请点{" "}
          <Link
            href="/playground"
            className="font-medium text-primary hover:underline"
          >
            Playground
          </Link>
          !
        </p>


      </div>
    </div>
  );
}
