import { CheckCircle2, Circle } from "lucide-react";

type PasswordRuleProps = {
  valid: boolean;
  text: string;
};

function PasswordRule({ valid, text }: PasswordRuleProps) {
  return (
    <li className="flex items-center gap-2">
      {valid ? (
        <CheckCircle2 className="h-4 w-4 text-green-500" />
      ) : (
        <Circle className="h-4 w-4 text-muted-foreground" />
      )}

      <span className={valid ? "text-green-600" : "text-muted-foreground"}>
        {text}
      </span>
    </li>
  );
}

export default PasswordRule;
