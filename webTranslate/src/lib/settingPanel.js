import {StringFormat,GetSettingOptions,SetSettingOptions,options} from "./utils"
import {Panel} from "./panel"
import {Trans} from "../transEngine/trans"

//设置面板
export var SettingPanel={
    config:[{title:"",item:[{code:"",text:""}]}],
    Create:function(popBoxEl,randomCode){
        var self=this;
        var settingHtml=[];
        this.InitConfig();
        settingHtml.push('<div style="padding-left: 15px;display: inline-block;">');
            /*
            settingHtml.push('<div style="padding-bottom: 30px; max-width: 600px;">');
                settingHtml.push('<div style="font-size: 14px; padding-bottom: 3px;">默认翻译引擎：</div>');
                settingHtml.push(StringFormat('<div style="padding-bottom: 3px; margin-left: 10px;"><label style="font-size: 14px; cursor: pointer;"><input type="radio" name="transEngine{0}" style="cursor: pointer;" value="yd">有道</label></div>',randomCode));
                settingHtml.push(StringFormat('<div style="padding-bottom: 0px; margin-left: 10px;"><label style="font-size: 14px; cursor: pointer;"><input type="radio" name="transEngine{0}" style="cursor: pointer;" value="ge">谷歌</label></div>',randomCode));
            settingHtml.push('</div>');
            */
            for (var index = 0; index < this.config.length; index++) {
                var configItem = this.config[index];
                settingHtml.push('<div style="padding-bottom: 30px; max-width: 600px;">');
                settingHtml.push(StringFormat('<div style="font-size: 14px; padding-bottom: 3px;">{0}</div>',configItem.title));
                for (var itemIndex = 0; itemIndex < configItem.item.length; itemIndex++) {
                    var itemObj = configItem.item[itemIndex];
                    settingHtml.push(StringFormat('<div style="padding-bottom: 0px; margin-left: 10px;"><label style="font-size: 14px; cursor: pointer;"><input type="radio" name="transEngine{0}" style="cursor: pointer;" value="{1}">{2}</label></div>',randomCode,itemObj.code,itemObj.text));
                }   
                settingHtml.push('</div>');
            }

            settingHtml.push('<div>');
                settingHtml.push(StringFormat('<button id="saveBtn{0}">保存</button>',randomCode));
                settingHtml.push(StringFormat('<span id="saveStatus{0}" style="display:none;margin-left:10px;background-color: #fff1a8;padding: 3px;">设置已保存。</span>',randomCode));
            settingHtml.push('</div>');
        settingHtml.push('</div>');

        var settingHtmlStr=settingHtml.join("");
        Panel.popBoxEl=popBoxEl;
        Panel.randomCode=randomCode;
        Panel.Create("网页翻译助手设置","auto bottom",false,settingHtmlStr,function($panel){
            $panel.css({
                position: "fixed",
                top:"20px"
            });
            self.Update(randomCode);
            //保存设置
            $panel.find(StringFormat("#panelBody{0} #saveBtn{0}",randomCode)).click(function(e){
                var defaultTransEngine=$panel.find(StringFormat("#panelBody{0} input[name='transEngine{0}']:checked",randomCode)).val();
                options.defaulttransengine=defaultTransEngine;
                SetSettingOptions();
                $panel.find(StringFormat("#panelBody{0} #saveStatus{0}",randomCode)).fadeIn(function(){
                    setTimeout(function(){
                        $panel.find(StringFormat("#panelBody{0} #saveStatus{0}",randomCode)).fadeOut();
                    },1500);
                });
            });
        });
    },
    Update:function(randomCode){
        GetSettingOptions();
        Panel.Update(function($panel){
            $panel.find(StringFormat("#panelBody{0} input[name='transEngine{0}'][value='{1}']",randomCode,options.defaulttransengine)).prop("checked",true);
        });
    },
    InitConfig:function(){
        this.config=[];
        var configObj={title:"",item:[{code:"",text:""}]};
        configObj.title="默认翻译引擎：";
        configObj.item=[];
        for (var k in Trans.transEngineList) {
            if (Trans.transEngineList.hasOwnProperty(k)) {
                var v = Trans.transEngineList[k].codeText;
                configObj.item.push({code:k,text:v});
            }
        }
        this.config.push(configObj);
    }
}