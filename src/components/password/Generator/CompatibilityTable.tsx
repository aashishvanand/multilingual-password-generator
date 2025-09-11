"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Tooltip, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import WarningIcon from '@mui/icons-material/Warning';

const platforms = [
    { rank: 1, name: 'Google', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 2, name: 'Facebook', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 3, name: 'Apple', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 4, name: 'Microsoft', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 5, name: 'Instagram', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 6, name: 'AWS', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 7, name: 'TikTok', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 8, name: 'YouTube', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 9, name: 'WhatsApp', hasAccountSupport: 'Yes', support: 'No', notes: 'Only OTP Supported' },
    { rank: 10, name: 'Amazon', hasAccountSupport: 'Yes', support: 'Yes', notes: 'Same as 6' },
    { rank: 11, name: 'Outlook', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 12, name: 'Microsoft 365', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 13, name: 'Netflix', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 14, name: 'iCloud', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 3' },
    { rank: 15, name: 'Bing', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 16, name: 'Yahoo', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 17, name: 'Spotify', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 18, name: 'Apple Music', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 3' },
    { rank: 19, name: 'Azure', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 20, name: 'Wikipedia', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 21, name: 'Samsung', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 22, name: 'Snapchat', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 23, name: 'Roblox', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 24, name: 'MSN', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 25, name: 'LinkedIn', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 26, name: 'Xiaomi', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 27, name: 'X', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 28, name: 'Mozilla', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 29, name: 'Kwai', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 30, name: 'Baidu', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 31, name: 'Microsoft Teams', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 32, name: 'Microsoft Windows', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 33, name: 'Skype', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 34, name: 'GitHub', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 35, name: 'ChatGPT', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 36, name: 'Yandex', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 37, name: 'Reddit', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 38, name: 'Android', hasAccountSupport: 'No', support: 'No', notes: 'Same as 1' },
    { rank: 39, name: 'QQ', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 40, name: 'Discord', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 41, name: 'GMail', hasAccountSupport: 'No', support: 'No', notes: 'Same as 1' },
    { rank: 42, name: 'Zoom', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 43, name: 'Pinterest', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 44, name: 'Twitch', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 45, name: 'Comcast Corp', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 46, name: 'PlayStation', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 47, name: 'Roku', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 48, name: 'Xbox', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 49, name: 'Shopee', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 50, name: 'Dropbox', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 51, name: 'Steam Games', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 52, name: 'Grammarly', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 53, name: 'Epic Games', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 54, name: 'GMX', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 55, name: 'Opera', hasAccountSupport: 'No', support: 'NA', notes: '' },
    { rank: 56, name: 'Temu', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 57, name: 'Disney Plus', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 58, name: 'Douyin', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 59, name: 'Weather.com', hasAccountSupport: 'No', support: 'NA', notes: '' },
    { rank: 60, name: 'Taobao', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 61, name: 'Shopify', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 62, name: 'Canva', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 63, name: 'Prime Video', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 64, name: 'eBay', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 65, name: 'Google Calendar', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 1' },
    { rank: 66, name: 'Telegram', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 67, name: 'Slack', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 68, name: 'Alibaba', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 69, name: 'Mail ru', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 70, name: 'VK', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 71, name: 'AnyDesk', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 72, name: 'Life360', hasAccountSupport: 'Yes', support: 'NA', notes: 'Only Email OTP Supported' },
    { rank: 73, name: 'Electronic Arts', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 74, name: 'Brave', hasAccountSupport: 'NA', support: 'NA', notes: '' },
    { rank: 75, name: 'WordPress', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 76, name: 'Stripe', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 77, name: 'TeamViewer', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 78, name: 'Globo', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 79, name: 'Giphy', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 80, name: 'Yahoo Mail', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 16' },
    { rank: 81, name: 'Duolingo', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 82, name: 'SnackVideo', hasAccountSupport: 'No', support: 'NA', notes: '' },
    { rank: 83, name: 'Atlassian', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 84, name: 'Visual Studio', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 85, name: 'TradingView', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 86, name: 'OneDrive', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 4' },
    { rank: 87, name: 'Google Translate', hasAccountSupport: 'Yes', support: 'No', notes: 'Same as 1' },
    { rank: 88, name: 'Naver', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 89, name: 'Ring', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 90, name: 'Alipay', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 91, name: 'Viber', hasAccountSupport: 'Yes', support: 'No', notes: 'Only Calls or SMS to verify' },
    { rank: 92, name: 'WPS', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 93, name: 'Capcut', hasAccountSupport: 'Yes', support: 'Yes', notes: 'Same as 7' },
    { rank: 94, name: 'Shein', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 95, name: 'Philips Hue', hasAccountSupport: 'Yes', support: 'Yes', notes: '' },
    { rank: 96, name: 'Web', hasAccountSupport: 'Yes', support: 'NA', notes: 'Unable to Signup because of region restrictions' },
    { rank: 97, name: 'Salesforce', hasAccountSupport: 'Yes', support: 'No', notes: 'Only SSO or Code to email' },
    { rank: 98, name: 'Vivo', hasAccountSupport: 'Yes', support: 'No', notes: '' },
    { rank: 99, name: 'DuckDuckGo', hasAccountSupport: 'NA', support: 'NA', notes: '' },
    { rank: 100, name: 'Steam Community', hasAccountSupport: 'Yes', support: 'No', notes: '' },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const SupportCell = ({ support, notes }: { support: string; notes?: string }) => {
    let icon = null;
    if (support === 'Yes') {
        icon = <CheckCircleIcon color="success" />;
    } else if (support === 'No') {
        icon = <CancelIcon color="error" />;
    } else if (support === 'NA') {
        icon = <WarningIcon color="warning" />;
    } else {
        return <Typography variant="body2">{support}</Typography>;
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon}
            {notes && (
                <Tooltip title={notes}>
                    <IconButton size="small">
                        <InfoIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
};

export default function CompatibilityTable() {
    const [hasAccountSupportFilter, setHasAccountSupportFilter] = useState('all');
    const [supportFilter, setSupportFilter] = useState('all');

    const filteredPlatforms = platforms.filter(platform => {
        const hasAccountSupportMatch = hasAccountSupportFilter === 'all' || platform.hasAccountSupport === hasAccountSupportFilter;
        const supportMatch = supportFilter === 'all' || platform.support === supportFilter;
        return hasAccountSupportMatch && supportMatch;
    });

    const renderFilter = (value: string, onChange: (value: string) => void) => (
        <FormControl size="small" sx={{ minWidth: 80 }}>
            <Select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                displayEmpty
                variant="standard"
                sx={{
                    '&:before': {
                        border: 'none',
                    },
                    '&:after': {
                        border: 'none',
                    },
                    '& .MuiSelect-select': {
                        padding: '4px 24px 4px 8px',
                        fontSize: '0.875rem',
                    },
                }}
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="NA">NA</MenuItem>
            </Select>
        </FormControl>
    );

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="compatibility table">
                <TableHead>
                    <TableRow>
                        <TableCell>Rank</TableCell>
                        <TableCell>Service Name</TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                Has Account Support
                                {renderFilter(hasAccountSupportFilter, setHasAccountSupportFilter)}
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                Support
                                {renderFilter(supportFilter, setSupportFilter)}
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPlatforms.map((platform) => (
                        <StyledTableRow key={platform.name}>
                            <TableCell component="th" scope="row">
                                {platform.rank}
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Image src={`https://www.google.com/s2/favicons?domain=${platform.name.toLowerCase().replace(/ /g, '')}.com`} alt={`${platform.name} logo`} width={16} height={16} />
                                    <Typography>{platform.name}</Typography>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <SupportCell support={platform.hasAccountSupport} notes={platform.notes} />
                            </TableCell>
                            <TableCell>
                                <SupportCell support={platform.support} />
                            </TableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}