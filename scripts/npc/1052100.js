/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Don Giovanni
	Kerning VIP Hair/Hair Color Change.
*/
var status = 0;
var beauty = 0;
var mhair = Array(30030, 30020, 30000, 30130, 30190, 30110, 30180, 30050, 30040, 30160);
var fhair = Array(31050, 31040, 31000, 31060, 31090, 31020, 31130, 31120, 31140, 31010);
var hairnew = Array();
var hairCard = 4050003;
var hairColorCard = 4051003;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("你好！大家都叫我钱老板，时尚的风向标就是我了！如果你有#b#t"+hairCard+"##k 或者 #b#t"+hairColorCard+"##k, 为什么不让我帮你重塑形象呢？你想做哪个发型呢...\r\n#L0#发型设计: #i"+hairCard+"##t"+hairCard+"##l\r\n#L1#头发染色: #i"+hairColorCard+"##t"+hairColorCard+"##l");
        } else if (status == 1) {
            if (selection == 0) {
                beauty = 0;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair.length; i++)
                        hairnew.push(mhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair.length; i++)
                        hairnew.push(fhair[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendStyle("我可以彻底的改变你的发型，让你看上去更加的帅气。为什么不尝试改变呢？如果你有 #b#t"+hairCard+"##k 我将为你提供服务。选一个你喜欢的发型吧。", hairnew);
            } else if (selection == 1) {
                beauty = 1;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    haircolor.push(current + i);
                }
                cm.sendStyle("我可以彻底的改变你头发的颜色，让你看上去更加的帅气。为什么不尝试改变呢？如果你有 #b#t"+hairColorCard+"##k 我将为你提供服务。选一个你喜欢的颜色吧。", haircolor);
            }
        }
        else if (status == 2){
            if (beauty == 0){
                if (cm.haveItem(hairCard)){
                    cm.gainItem(hairCard, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("赶紧出去兜兜风，展示下帅气的发型吧！");
                } else
                    cm.sendOk("嗯哼...看上去你没有高级会员卡...我没有办法为你提供服务. 你可以去商城中购买...我能帮到你的就这些了...");
            }
            if (beauty == 1){
                if (cm.haveItem(hairColorCard)){
                    cm.gainItem(hairColorCard, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("赶紧出去兜兜风，展示下帅气的发型吧！");
                } else
                    cm.sendOk("嗯哼...看上去你没有高级会员卡...我没有办法为你提供服务. 你可以去商城中购买...我能帮到你的就这些了...");
            }
			cm.dispose();
        }
    }
}
