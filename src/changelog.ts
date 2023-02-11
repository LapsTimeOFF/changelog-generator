/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getCommitList } from './git';

export const Emojis = {
  feat: '✨',
  fix: '🐛',
  docs: '📚',
  style: '💎',
  refactor: '📦',
  perf: '🚀',
  test: '🚨',
  build: '🛠',
  ci: '⚙️',
  chore: '♻️',
  revert: '🗑',
};

export const generateChangelog = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: any,
  version: string
) => {
  getCommitList(
    (
      list: {
        id: string;
        author: string;
        message: string;
        date: string;
      }[]
    ) => {
      const changelog: string[] = [
        `# ${version} (${
          new Date(Date.now())
            .toLocaleString('en')
            // @ts-ignore
            .replaceAll('/', '-')
            .split(', ')[0]
        })`,
        '',
      ];

      for (let _i = 0; _i < list.length; _i++) {
        const commit = list[_i];

        let [type] = commit.message.split('(');
        if (type.includes(':')) [type] = commit.message.split(':');

        changelog.push(
          // @ts-ignore
          `${Emojis[type]} ${commit.message
            // @ts-ignore
            .replaceAll('(', '(**')
            .replaceAll(')', '**)')}`
        );
      }
      callback(changelog.join('\n'));
    }
  );
};
