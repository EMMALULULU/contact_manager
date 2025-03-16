import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function PhoneInputComponent({
  onChange,
  country = 'hk',
  value,
  error,
}: {
  onChange: (value: string) => void;
  country?: string;
  value: string;
  error?: boolean;
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
        label: 'Phone Number',
        name:"phone"
      }}
      specialLabel='Phone Number'
    />
  );
}
