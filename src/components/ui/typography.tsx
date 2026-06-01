import React from "react";
export function TypographyH1({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h1
      className={`scroll-m-20  text-4xl font-extrabold tracking-tight text-balance ${className || ""}`}
    >
      {text}
    </h1>
  );
}

export function TypographyH2({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h2
      className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className || ""}`}
    >
      {text}
    </h2>
  );
}

export function TypographyH3({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h3
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className || ""}`}
    >
      {text}
    </h3>
  );
}

export function TypographyH4({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <h4
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${className || ""}`}
    >
      {text}
    </h4>
  );
}

export function TypographyP({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className || ""}`}>
      {text}
    </p>
  );
}

export function TypographyBlockquote({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <blockquote className={`mt-6 border-l-2 pl-6 italic ${className || ""}`}>
      &quot;{text}&quot;
    </blockquote>
  );
}

export function TypographyTable({
  tableHeadings,
  tableData,
  className,
}: {
  tableHeadings: string[];
  tableData: string[][];
  className?: string;
}) {
  //   const tableData = [
  //     "King's Treasury",
  //     "People's happiness",
  //     "Royal Banquets",
  //   ];
  //   const tableData = [
  //     ["Empty", "Overflowing", "Rich"],
  //     ["Modest", "Satisfied", "Ecstatic"],
  //     ["Full", "Ecstatic", "Overwhelmed"],
  //   ];

  return (
    <div className={`my-6 w-full overflow-y-auto ${className || ""}`}>
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
            {tableHeadings?.length > 1 &&
              tableHeadings?.map((heading, index) => (
                <th
                  className="border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right"
                  key={`${index}-${heading}`}
                >
                  {heading}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {tableData?.length > 0 &&
            tableData?.map((row, rowIndex) => (
              <tr className="m-0 border-t p-0 even:bg-muted" key={rowIndex}>
                <>
                  {row?.map((cell, cellIndex) => (
                    <td
                      className="border px-4 py-2 [[align=center]]:text-center [[align=right]]:text-right"
                      key={`${rowIndex}-${cellIndex}`}
                    >
                      {cell}
                    </td>
                  ))}
                </>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export function TypographyList({ className }: { className?: string }) {
  return (
    <ul className={`my-6 ml-6 list-disc [&>li]:mt-2 ${className || ""}`}>
      <li>1st level of puns: 5 gold coins</li>
      <li>2nd level of jokes: 10 gold coins</li>
      <li>3rd level of one-liners : 20 gold coins</li>
    </ul>
  );
}

export function TypographyInlineCode({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <code
      className={`relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ${className || ""}`}
    >
      {text}
    </code>
  );
}

export function TypographyLead({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`text-xl text-muted-foreground ${className || ""}`}>{text}</p>
  );
}

export function TypographyLarge({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`text-lg font-semibold ${className || ""}`}>{text}</div>
  );
}

export function TypographySmall({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <small className={`text-sm leading-none font-medium ${className || ""}`}>
      {text}
    </small>
  );
}

export function TypographyMuted({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <p className={`text-sm text-muted-foreground ${className || ""}`}>{text}</p>
  );
}
