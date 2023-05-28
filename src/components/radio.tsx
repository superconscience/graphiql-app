import React, { FC } from 'react';

type RadioProps = {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Radio: FC<RadioProps> = ({ name, value, label, checked, onChange }) => {
  return (
    <label className="radio__label">
      <input
        className="radio__input"
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <span className="radio__name">{label}</span>
    </label>
  );
};
