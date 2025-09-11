/**
 * @file CompatibilityTable.tsx
 * @description This component displays a sortable and filterable table of platforms,
 * indicating their compatibility with the password generator. It shows which platforms
 * support account creation and whether they are compatible with the generated passwords.
 * The data is based on the top 100 websites from Cloudflare Radar.
 */

"use client";

import { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, IconButton, Select, MenuItem, FormControl } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

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

export default function CompatibilityTable() {
    const [filter, setFilter] = useState('all');

    // Function to get icons based on support status
    const getCompatibilityIcon = (support: string) => {
        switch (support) {
            case 'Yes':
                return <CheckIcon sx={{ color: 'success.main', fontSize: '20px' }} />;
            case 'No':
                return <CloseIcon sx={{ color: 'error.main', fontSize: '20px' }} />;
            case 'NA':
                return <WarningAmberIcon sx={{ color: 'warning.main', fontSize: '20px' }} />;
            default:
                return <CloseIcon sx={{ color: 'error.main', fontSize: '20px' }} />;
        }
    };

    // Function to get icons for hasAccountSupport
    const getAccountSupportIcon = (hasSupport: string) => {
        switch (hasSupport) {
            case 'Yes':
                return <CheckIcon sx={{ color: 'success.main', fontSize: '20px' }} />;
            case 'No':
                return <CloseIcon sx={{ color: 'error.main', fontSize: '20px' }} />;
            case 'NA':
                return <WarningAmberIcon sx={{ color: 'warning.main', fontSize: '20px' }} />;
            default:
                return <CloseIcon sx={{ color: 'error.main', fontSize: '20px' }} />;
        }
    };

    const filteredPlatforms = platforms.filter(platform => {
        if (filter === 'all') return true;
        if (filter === 'compatible') return platform.support === 'Yes';
        if (filter === 'incompatible') return platform.support === 'No';
        return true;
    });

    return (
        <Box>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="h2">
                    Platform Compatibility
                </Typography>
                <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        displayEmpty
                    >
                        <MenuItem value="all">All Platforms</MenuItem>
                        <MenuItem value="compatible">Compatible</MenuItem>
                        <MenuItem value="incompatible">Incompatible</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Platform</TableCell>
                            <TableCell>Account Support</TableCell>
                            <TableCell>Compatible</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredPlatforms.map((platform) => (
                            <TableRow key={platform.rank}>
                                <TableCell>{platform.rank}</TableCell>
                                <TableCell>{platform.name}</TableCell>

                                {/* Account Support with icon and optional info button */}
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        {getAccountSupportIcon(platform.hasAccountSupport)}
                                        {platform.notes && (
                                            <Tooltip title={platform.notes} arrow placement="top">
                                                <IconButton size="small" sx={{ p: 0.5 }}>
                                                    <InfoIcon fontSize="small" sx={{ color: 'text.secondary' }} />
                                                </IconButton>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </TableCell>

                                {/* Compatible column with just icon */}
                                <TableCell>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        {getCompatibilityIcon(platform.support)}
                                    </Box>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}