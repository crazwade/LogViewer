import type { FindLogResponse } from '@/api/nlog/findLog';

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function generateRandomDateTime(): string {
  const year = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020;
  const month = padZero(Math.floor(Math.random() * 12) + 1);
  const day = padZero(Math.floor(Math.random() * 28) + 1);
  const hour = padZero(Math.floor(Math.random() * 24));
  const minute = padZero(Math.floor(Math.random() * 60));
  const second = padZero(Math.floor(Math.random() * 60));

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function generateRandomPid(): string {
  return `${Math.floor(Math.random() * 90000) + 10000}`;
}

function generateRandomLevel(): string {
  return `${Math.floor(Math.random() * 150) + 1}`;
}

function generateRandomSource(): string[] {
  const sources = ['測試', '開發', '生產', '系統'];
  const count = Math.floor(Math.random() * sources.length) + 1;
  const selectedSources: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const index = Math.floor(Math.random() * sources.length);
    selectedSources.push(sources[index]);
  }

  return selectedSources;
}

function generateRandomMessage(): string {
  const messages = ['成功', '失敗', '錯誤', '警告'];
  const randomIndex = Math.floor(Math.random() * messages.length);
  const message = messages[randomIndex];
  const randomNumber = padZero(Math.floor(Math.random() * 10000));

  const ts1 = '{"status":200,"text":"","error":null}';

  const ts2 = '{"statusMix":[100, 200, 300 ], "target": 192.168.0.0}';

  const ts3 = '{"status":200,"text":"","error":null, "level": [1,2,3,4,5,6]}';

  const rand = Math.floor(Math.random() * 4);

  let salt = '';

  if (rand === 0) {
    salt = ts1;
  }

  if (rand === 1) {
    salt = ts2;
  }

  if (rand === 2) {
    salt = ts3;
  }

  return `${message}+${randomNumber}+ ${salt}`;
}

function generateRandomIp(): string {
  return `192.168.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function generateRandomClassName(): string {
  const classes = [
    'nodejs_rpg_bacc_source_bc_handler_1',
    'nodejs_rpg_bacc_source_bc_handler_2',
    'nodejs_rpg_bacc_source_bc_handler_3',
    'nodejs_rpg_bacc_source_bc_handler_4',
  ];
  const randomIndex = Math.floor(Math.random() * classes.length);
  return classes[randomIndex];
}

function generateRandomLogState(): number {
  return Math.floor(Math.random() * 2);
}

function generateRandomTableName(): string {
  const year = Math.floor(Math.random() * (2025 - 2020 + 1)) + 2020;
  const month = padZero(Math.floor(Math.random() * 12) + 1);
  const day = padZero(Math.floor(Math.random() * 28) + 1);
  const hour = padZero(Math.floor(Math.random() * 24));
  const minute = padZero(Math.floor(Math.random() * 60));

  return `nlog_data_${year}_${month}_${day}_${hour}_${minute}`;
}

function generateRandomTimestamp(): number {
  return Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 365 * 10);
}

function generateFakeData(count: number): FindLogResponse[] {
  const data: FindLogResponse[] = [];

  for (let i = 1; i <= count; i += 1) {
    const fakeData: FindLogResponse = {
      id: i,
      createtime: generateRandomDateTime(),
      pid: generateRandomPid(),
      level: generateRandomLevel(),
      source: generateRandomSource(),
      message: generateRandomMessage(),
      ip: generateRandomIp(),
      cn: generateRandomClassName(),
      log_state: generateRandomLogState(),
      log_time: generateRandomDateTime(),
      table: generateRandomTableName(),
      create_ts: generateRandomTimestamp(),
    };

    data.push(fakeData);
  }

  return data;
}

export default generateFakeData;
