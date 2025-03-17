import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputComponent({
  onChange,
  country = 'hk',
  value,
  error,
  label,
}: {
  onChange: (value: string) => void;
  country?: string;
  value: string;
  error?: boolean;
  label?: string;
}) {
  return (
    <PhoneInput
      isValid={!error}
      onChange={onChange}
      country={country}
      value={value}
      inputStyle={{
        width: '100%',
        height: '54px',
        borderRadius: '6px',
      }}
      inputProps={{
        label: label,
        name: label,
      }}
      specialLabel={label}
    />
  );
}
