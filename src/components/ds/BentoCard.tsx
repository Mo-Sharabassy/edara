import React from "react";
import { Card } from "./Card";

/**
 * Edara BentoCard — the "End-to-End Execution" service card. Icon tile that
 * fills primary and rotates on hover, headline-md title, body, hairline
 * divider, and a checklist footer of feature labels.
 */
type BentoCardProps = React.HTMLAttributes<HTMLDivElement> & {
  icon: string;
  title: string;
  features?: string[];
};

export function BentoCard({ icon, title, children, features = [], ...rest }: BentoCardProps) {
  return (
    <Card interactive {...rest}>
      <div className="edara-bento">
        <div className="edara-bento__icon">
          <span className="material-symbols-outlined">{icon}</span>
        </div>
        <div>
          <h3 className="edara-bento__title">{title}</h3>
          <p className="edara-bento__body">{children}</p>
        </div>
        {features.length > 0 && (
          <ul className="edara-bento__foot">
            {features.map((f, i) => (
              <li className="edara-bento__item" key={i}>
                <span className="material-symbols-outlined">check_circle</span>
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

export default BentoCard;
