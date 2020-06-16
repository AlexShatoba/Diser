import { LineCodeResultDto } from '../model/line-code-result';

export interface LinterDto {
  errorCount: number;
  filePath: string;
  fixableErrorCount: number;
  fixableWarningCount: number;
  messages: Array<LineCodeResultDto>;
  source: string;
  usedDeprecatedRules: Array<string>;
  warningCount: number;
}