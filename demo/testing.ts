import { getCommitList } from '../src/index';

getCommitList(
  (
    list: {
      id: string;
      author: string;
      message: string;
      date: string;
    }[]
  ) => {
    console.log(list);
  }
);
