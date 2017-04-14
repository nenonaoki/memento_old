// @flow
import React from 'react';
import { Link } from 'react-router';

const Complete = () => (
  <div className="ibox">
    <div className="ibox-title">
      <h3>ユーザー登録</h3>
    </div>
    <div className="ibox-content">
      <h2>仮登録メールをお送りしました。</h2>
      <p>support@XXX.jp から届いているメールをご確認の上、本文中のリンクから本登録を完了させてください。<br />
      リンクの有効期限はXX時間です。</p>
      <div className="text-center">
        <Link to="/" className="btn btn-sm btn-default">トップページへ</Link>
      </div>
    </div>
  </div>
);

export default Complete;
