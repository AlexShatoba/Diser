export interface LineCodeResult {
  message: string;
  column: number;
  line: number;
  type: number;
}

export interface LineCodeResultDto {
  message: string;
  column: number;
  line: number;
  endColumn: number;
  endLine: number;
  messageId: string;
  nodeType: string;
  ruleId: string;
  severity: number;
}

export class LineCodeResultMapper {
  public from(dtoModel: LineCodeResultDto): LineCodeResult {
    return <LineCodeResult>{
      message: dtoModel.message,
      column: dtoModel.column,
      line: dtoModel.line,
      type: dtoModel.severity,
    };
  }

  public to(model: LineCodeResult): LineCodeResultDto {
    throw new Error('Not implemented');
  }
}
