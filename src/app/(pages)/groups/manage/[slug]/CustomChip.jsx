import Chip from '@mui/material/Chip';

export function CustomChip(props) {
    const { borderRadius = 1.5, mx = 0.2, sx = {}, ...rest } = props;
    return (
      <Chip {...rest} sx={{ borderRadius, mx, ...sx }} />
    );
}