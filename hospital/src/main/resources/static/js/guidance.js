/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 12-12-13
 * Time: ����5:41
 * To change this template use File | Settings | File Templates.
 */

var guidance=function(path){
    this.path = path;
}

guidance.prototype.replace=function(stringAll,keyword){
    stringAll = stringAll.replace(keyword, '<font>' + keyword + '</font>');
    return stringAll;
}

/**
 * ��ҽ����
 * @param memberId
 * @param count
 */
guidance.prototype.doctor_memberId=function(memberId,count){
    var url = this.path+"/doctor/info/"+memberId+'.json';
    var self = this;
    $.getJSON(url,function(json){
        if(json.doctor){
            var tagNameHtml="";
            var tagNames = json.doctor.tagNames;
            for(var i=0;i<tagNames.length;i++){
                tagNameHtml+=tagNames[i]+"&nbsp;";
            }
            $("#tagName"+count).html(tagNameHtml);
            var labNameHtml="";
            var labNames = json.doctor.labList;
            for(var j=0;j<labNames.length;j++){
                labNameHtml+= labNames[j].NAME;
            }
            $("#labName"+count).html(labNameHtml);
            var id = json.doctor.ID;
            $("#docLink"+count).attr("href",self.path+"/doctor/"+id+".html");

        }else{
            var docNmae = $("#docLink"+count).html();
            $("#docDt"+count).html("<strong>"+docNmae+"</strong>")
        }

    });
}

/**
 * ��ҽ���߻����.
 *
 * @param memberId
 * @param count
 * @param index
 */
guidance.prototype.hospital_activity_link=function(memberId,count,index){
    var url = this.path+"/doctor/info/"+memberId+'.json';
    var self = this;
    $.getJSON(url,function(json){
        if(json.doctor){
            var id = json.doctor.ID;
            $("#activityLink"+count+index).attr("href",self.path+"/doctor/"+id+"_online.html");
            $("#activityAnswer"+count+index).attr("href",self.path+"/doctor/"+id+"_online.html");
        }

    });
}

/**
 * ȡҽԺͳ����ص�ͳ����.
 *
 * @param doctorId
 */
guidance.prototype.getHospitalData=function(doctorId,sk){
    var url = this.path + "/hospital/data/"+doctorId+".json";
    var self = this;
    //��Ƶ�ģ��.�Լ�ҳ������.
    var template = '{{if LAB_NUM}}<cite><font>${LAB_NUM}</font>������</cite>{{/if}}'+
                   '{{if DOCTOR_NUM}}<cite><font>${DOCTOR_NUM}</font>λҽ��{{if DOCTOR_REGISTER_NUM}},${DOCTOR_REGISTER_NUM}λҽ����ԤԼ{{/if}}</cite>{{/if}}'+
                   '{{if DIRECTOR_NUM}}<cite><font>${DIRECTOR_NUM}</font>λ����ҽʦ</cite>{{/if}}'+
                   '{{if DEPUTY_DIRECTOR_NUM}}<cite><font>${DEPUTY_DIRECTOR_NUM}</font>λ������ҽʦ</cite>{{/if}}';
    var container=$("#sk"+sk);
    $.template("hdtemplate",template);
    $.getJSON(url,function(json){
        if(json.result == 0){
            var data = json.data;
            var regNum = $("#regnum"+sk);
            if(regNum){
                $(regNum).html(data.REGISTER_NUM);
            }
            if(data.DOCTOR_REGISTER_NUM){
                data.REGISTER_PERSEN=Math.round(data.DOCTOR_REGISTER_NUM/data.DOCTOR_NUM*100);
            }
            $.tmpl("hdtemplate",data).prependTo(container);
        }
    });
}

guidance.prototype.getHospitalDataForIframeLabType=function(doctorId,sk){
    var url = this.path + "/hospital/data/"+doctorId+".json";
    var self = this;
    //��Ƶ�ģ��.�Լ�ҳ������.
    var template = '{{if LAB_NUM}}(��<font>${LAB_NUM}</font>��){{/if}}';
    var container=$("#skLab"+sk);
    $.template("hdiltemplate",template);
    $.getJSON(url,function(json){
        if(json.result == 0){
            var data = json.data;
            var regNum = $("#regnum"+sk);
            if(regNum){
                $(regNum).html(data.REGISTER_NUM);
            }
            if(data.DOCTOR_REGISTER_NUM){
                data.REGISTER_PERSEN=Math.round(data.DOCTOR_REGISTER_NUM/data.DOCTOR_NUM*100);
            }
            $.tmpl("hdiltemplate",data).prependTo(container);
        }
    });
}

/**
 * ȡҽԺͳ����ص�ͳ����.
 * �����ٿƺ���ҳ��
 * @param doctorId
 */
guidance.prototype.getHospitalDataForIframe=function(doctorId,sk){
    var url = this.path + "/hospital/data/"+doctorId+".json";
    var self = this;
    //��Ƶ�ģ��.�Լ�ҳ������.
    var template = '{{if DOCTOR_NUM}}<font>${DOCTOR_NUM}</font>λ�Ƽ�ҽ��,{{if DOCTOR_REGISTER_NUM}}${REGISTER_PERSEN}%��ԤԼ,{{/if}}{{/if}}'+
                   '{{if DIRECTOR_NUM}}<font>${DIRECTOR_NUM}</font>λ����ҽʦ,{{/if}}'+
                   '{{if DEPUTY_DIRECTOR_NUM}}<font>${DEPUTY_DIRECTOR_NUM}</font>λ������ҽʦ{{/if}}';
    var container=$("#sk"+sk);
    $.template("hditemplate",template);
    $.getJSON(url,function(json){
        if(json.result == 0){
            var data = json.data;
            var regNum = $("#regnum"+sk);
            if(regNum){
                $(regNum).html(data.REGISTER_NUM);
            }
            if(data.DOCTOR_REGISTER_NUM){
                data.REGISTER_PERSEN=Math.round(data.DOCTOR_REGISTER_NUM/data.DOCTOR_NUM*100);
            }
            $.tmpl("hditemplate",data).prependTo(container);
        }
    });
}




/**
 * ȡҽԺ�Ƽ�ҽ��.
 *
 * @param doctorId
 */
guidance.prototype.getHospitalDoctors=function(hospitalId,labTypeId,diseaseId,areaId,sk,defaultPhoto,labTypeName,diseaseName){
    var url = this.path + "/hospital/doctors/"+hospitalId+".json"+"?labTypeId="+labTypeId+"&diseaseId="+diseaseId+"&areaId="+areaId;
    var self = this;
    var container=$("#doctors"+sk);
    var template = '<li>'+
                        '<em style=""><a href="${path}/doctor/${DOCTOR_ID}.html"><img src="${HEAD_PORTRAIT}" alt="${DOCTOR_NAME}"/></a></em>'+
                        '<span class="text">'+
                            '<strong><a href="${path}/doctor/${DOCTOR_ID}.html">${DOCTOR_NAME}</a>{{if REGISTER_FLAG=="Y"}}<i><a href="${path}/doctor/${DOCTOR_ID}_registers.html" title="ԤԼ�Һ�"></a></i>{{else}}&nbsp;{{/if}}${CLINIC}</strong>'+
                            '<cite><b>���ң�</b>{{html LAB}}</cite>'+
                            '<p><b>�ó���</b>{{html GOOD_AT}}</p>'+
                        '</span>'+
                    '</li>';
    $.template("dttemplate",template);
    $.getJSON(url,function(json){
         if(json.result==0){
             //�Ƽ�ҽ��
             $("#doctorCount"+hospitalId).html(json.doctorCount);
             //�Ƽ�ҽ�����鿴����.
             if(json.recommendLab){
                 $("#lab"+hospitalId).attr("href",self.path+"/hospital/"+json.recommendLab+"_lab.html");
             }

             //�����ͷ.
             $("#leftup"+hospitalId).attr("src","http://image.39.net/daoyi/images2013/icon_loff_c.gif");
             var doctors = json.doctors;
             var sum = 0;
             $.each(doctors,function(index,item){
                 var infos =  item.DOCTOR_INFOs;
                 $.each(infos,function(i,info){
                     sum ++;
                     if(info.CLINIC.length > 0){
                         info.CLINIC= info.CLINIC[0].NAME;
                     }
                     if(!info.HEAD_PORTRAIT){
                         info.HEAD_PORTRAIT=defaultPhoto;
                     }else{
                         info.HEAD_PORTRAIT=info.HEAD_PORTRAIT.replace(/#/, "s");
                     }
                     var labNames = "";
                     if(info.LAB_INFOs.length > 1){
                         $.each(info.LAB_INFOs,function(index,labinfo){
                             if(labinfo.LAB_TYPE_ID==labTypeId && !diseaseId){
                                 labNames+="<font>"+labinfo.NAME+"</font>";
                             }else{
                                 labNames+=labinfo.NAME;
                             }
                         });
                     }else if(info.LAB_INFOs.length == 1){
                         var labinfo = info.LAB_INFOs[0];
                         if(labinfo.LAB_TYPE_ID==labTypeId && !diseaseId){
                             labNames+="<font>"+labinfo.NAME+"</font>";
                         }else{
                             labNames+=labinfo.NAME;
                         }
                     }
                     info.LAB=labNames;//self.replace(labNames,labTypeName);
                     var goodAts = "";
                     $.each(info.GOODAT_INFOs,function(j,goodat){
                          if(goodAts == ""){
                              goodAts +=goodat.NAME;
                          }else{
                              goodAts+="��"+goodat.NAME;
                          }

                     });
                     info.GOOD_AT=self.replace(goodAts,diseaseName);
                     $.tmpl("dttemplate",info).appendTo(container);
                 });
             });
             //û���Ƽ�ҽ�������ء�չ���Ƽ�ҽ����,���Ƽ�ҽ��������
             if(sum <= 0){
                 $("#more"+hospitalId).hide();
                 $("#recommendDoctor"+hospitalId).hide();

             }else if(sum <= 3){
                 $("#rightup"+hospitalId).attr("src","http://image.39.net/daoyi/images2013/icon_roff_c.gif");
             }else{
                 $("#rightmove"+hospitalId).bind("click",function(){
                     downMove(this);
                     return false;
                 });
             }
         }else{
             if(sk=='1'){
                 var cHomhide=$("#cHos ul > li .box2:first");
                 cHomhide.hide();
             }
             $("#more"+hospitalId).hide();
             $("#recommendDoctor"+hospitalId).hide();

         }
    });

}

/**
 * ȡҽԺ�Ƽ�ҽ��.
 * �����ٿ�
 * @param doctorId
 */
guidance.prototype.getHospitalDoctorsForIframe=function(hospitalId,labTypeId,diseaseId,areaId,sk,defaultPhoto,labTypeName,diseaseName){
    var url = this.path + "/hospital/doctors/"+hospitalId+".json"+"?labTypeId="+labTypeId+"&diseaseId="+diseaseId+"&areaId="+areaId;
    var self = this;
    var container=$("#doctors"+sk);
    var template = '<li><a href="${path}/doctor/${DOCTOR_ID}.html"><img src="${HEAD_PORTRAIT}" alt="${DOCTOR_NAME}" width="60",height="75"/></a><span><strong><p><a class="n" href="${path}/doctor/${DOCTOR_ID}.html">${DOCTOR_NAME}</a><a href="${path}/doctor/${DOCTOR_ID}_registers.html" class="y"><img src="http://image.39.net/hdbk/images/baike_yue.gif"></a><i>${CLINIC}</i></p></strong><p>���ң�{{html LAB}}</p><p class="d">�ó���<i>{{html GOOD_AT}}</i></p><br><br><br></p></span></li>';
    
    $.template("dtitemplate",template);
    $.getJSON(url,function(json){
         if(json.result==0){

             var doctors = json.doctors;
             var sum = 0;
             $.each(doctors,function(index,item){
                 var infos =  item.DOCTOR_INFOs;
                 $.each(infos,function(i,info){
                     sum ++;
                     if(info.CLINIC.length > 0){
                         info.CLINIC= info.CLINIC[0].NAME;
                     }
                     if(!info.HEAD_PORTRAIT){
                         info.HEAD_PORTRAIT=defaultPhoto;
                     }else{
                         info.HEAD_PORTRAIT=info.HEAD_PORTRAIT.replace(/#/, "s");
                     }
                     var labNames = "";
                     if(info.LAB_INFOs.length > 1){
                         $.each(info.LAB_INFOs,function(index,labinfo){
                             if(labinfo.LAB_TYPE_ID==labTypeId && !diseaseId){
                                 labNames+="<font>"+labinfo.NAME+"</font>";
                             }else{
                                 labNames+=labinfo.NAME;
                             }
                         });
                     }else if(info.LAB_INFOs.length == 1){
                         var labinfo = info.LAB_INFOs[0];
                         if(labinfo.LAB_TYPE_ID==labTypeId && !diseaseId){
                             labNames+="<font>"+labinfo.NAME+"</font>";
                         }else{
                             labNames+=labinfo.NAME;
                         }
                     }
                     info.LAB=labNames;//self.replace(labNames,labTypeName);
                     var goodAts = "";
                     $.each(info.GOODAT_INFOs,function(j,goodat){
                          if(goodAts == ""){
                              goodAts +=goodat.NAME;
                          }else{
                              goodAts+="��"+goodat.NAME;
                          }

                     });
                     
                     info.GOOD_AT=self.replace(goodAts,diseaseName).substring(0, 45);
                     $.tmpl("dtitemplate",info).appendTo(container);
                 });
             });
             //û���Ƽ�ҽ�������ء�չ���Ƽ�ҽ����,���Ƽ�ҽ��������
             if(sum <= 0){
                 $("#more"+hospitalId).hide();
                 $("#recommendDoctor"+hospitalId).hide();

             }else if(sum <= 2){
                 $("#rightup"+hospitalId).attr("src","http://image.39.net/daoyi/images2013/icon_roff_c.gif");
             }else{
                 $("#rightmove"+hospitalId).bind("click",function(){
                     
                     return false;
                 });
             }
         }else{
             if(sk=='1'){
                 var cHomhide=$("#cHos ul > li .b2:first");
                 cHomhide.hide();
             }
             $("#more"+hospitalId).hide();
             $("#recommendDoctor"+hospitalId).hide();

         }
    });
}





