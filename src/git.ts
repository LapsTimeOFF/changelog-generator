import { spawn } from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCommitList = (callback: any) => {
  const gitLogs: string[] = [];
  const gitLog = spawn('git', ['log']);

  gitLog.stdout.on('data', (data: string) => {
    gitLogs.push(data);
  });

  gitLog.on('close', () => {
    const commits = gitLogs
      .join('')
      .split('\n')
      .filter((e) => e !== '');
    const commitArray: {
      id?: string;
      author?: string;
      message?: string;
      date?: string;
    }[] = [];
    let index = -1;

    for (let _i = 0; _i < commits.length; _i++) {
      const commit = commits[_i];

      if (commit.startsWith('commit ')) {
        index++;
        commitArray[index] = {
          id: commit.slice('commit '.length),
        };
      } else {
        if (commit.startsWith('Author:')) {
          commitArray[index] = {
            author: commit.slice('Author: '.length),
            ...commitArray[index],
          };
        } else if (commit.startsWith('Date: ')) {
          commitArray[index] = {
            date: commit.slice('Date:   '.length),
            ...commitArray[index],
          };
        } else
          commitArray[index] = {
            message:
              commitArray[index].message ??
              '' + commitArray[index].message === undefined ? ' ' : '' + commit.slice('    '.length),
            ...commitArray[index],
          };
      }
    }
    callback(commitArray);
  });
};
