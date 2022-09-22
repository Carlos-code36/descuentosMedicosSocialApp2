import { PublicationsService } from '@services/publications.service';
import { UserService } from '@services/user.service';
import { Component, ViewChild, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentsService } from '@app/services/appointments.service';
import { IonSlides, ModalController, Platform } from '@ionic/angular';

import { Globals } from '@app/globals';
import { BeneficiariesService } from '@app/services/benificiaries.service';
import { ModalDetailDoctorComponent } from '@app/components/modal-detail-doctor/modal-detail-doctor.component';
import { ModalCertificadoComponent } from '../../../components/modal-certificado/modal-certificado.component';
import { async } from '@angular/core/testing';
import { ModalReciboComponent } from '../../../components/modal-recibo/modal-recibo.component';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-new-appoinment',
  templateUrl: './new-appoinment.page.html',
  styleUrls: ['./new-appoinment.page.scss'],
})
export class NewAppoinmentPage {
  @ViewChild('slides') slides: IonSlides;

  @HostListener('ionBackButton', ['$event'])
  onGoBack(event){
    event.preventDefault();
  }

  idPatient;
  idPreviousAppoinment;

  patient;
  titular;

  holidays: any;

  municipality = null;
  company = null;
  service = null;
  speciality = null;

  idProvider = null;
  provider = null;

  showCalendar: boolean = false;

  limitHour: number = undefined;
  dateSelected = null;
  branchSelected = null;
  doctorSelected = null;
  scheduleSelected = '-1';
  patientSelected = null;
  petPatientSelected = null;
  groupSelected = 'all';

  isPet = false;
  pets = [];
  beneficiaries = [];
  doctors: Array<any> = [];
  schedules: Array<any> = [];
  branchsMedical: Array<any> = [];
  groupsBeneficiaries: Array<any> = [];
  idSubServicio: any;
  SubServicio: any;
  citas: any
  idCita: string;
  //motivo: any;

  noneSymptom = false;
  personSick = false;

  disabledPrevButton = true;
  disabledNextButton = false;

  toNextSlide = 1;
  toPrevSlide = 0;

  textPrevButton = 'Anterior';
  textNextButton = 'Siguiente';

  surveySymptoms = [
    { label: 'Dificultad para respirar', model: 'breathingBreathing', status: false },
    { label: 'Pérdida del olfato o gusto', model: 'lostSmell', status: false },
    { label: 'Dolor de garganta', model: 'throatPain', status: false },
    { label: 'Congestion nasal', model: 'congestion', status: false },
    { label: 'Dolor en el pecho', model: 'musclePain', status: false },
    { label: 'Fiebre', model: 'fever', status: false },
    { label: 'Tos', model: 'cough', status: false }
  ];

  dataAppoinment: object = {
    toShow: {
      nameConsultingRoom: 'NN',
      namePatient: 'NN',
      nameDoctor: 'NN',
      nameBranch: 'NN'
    },
    toSend: {
      fecha: undefined,
      hora: undefined,
      quienSacoCita: undefined,
      idSubServicios: undefined,
      idConsultorios: undefined,
      _idHorario: undefined,
      idSucursales: undefined,
      idMedico: undefined,
      idCita: undefined,
      motivoCita: undefined
    }
  }

  constructor(
    private router: Router,
    private platform: Platform,
    private _globals: Globals,
    private _userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private _appointmentService: AppointmentsService,
    private _publicationsService: PublicationsService,
    private _beneficiariesService: BeneficiariesService
  ) { 
    this.caracteres()
    this.platform.backButton.isStopped = true
    document.addEventListener('ionBackButton', (event) =>{
      console.log('aqui',event.target.addEventListener);
      event.preventDefault();
      this.prevSlide();
      //this.slides.slidePrev();
    })
  }

  async ionViewWillEnter() {
    this.municipality = this.activatedRoute.snapshot.params.data_req.split('_')[0];
    this.service = this.activatedRoute.snapshot.params.data_req.split('_')[1];
    this.company = this.activatedRoute.snapshot.params.data_req.split('_')[2];
    this.idProvider = this.activatedRoute.snapshot.params.data_req.split('_')[3];
    this.speciality = this.activatedRoute.snapshot.params.data_req.split('_')[4];
    console.log(this.speciality);
    this.idSubServicio = this.activatedRoute.snapshot.params.id_subServicio;
    this.isPet = this.activatedRoute.snapshot.params.data_req.includes('pet');

    this.dateSelected = new Date().toISOString().split('T')[0];
    this.dataAppoinment['toSend']['idSubServicios'] = this.idSubServicio;
    this.dataAppoinment['toSend']['quienSacoCita'] = this._globals.USER_OBJECT['idMembers'];
    this.dataAppoinment['toSend']['numeroRecibo'] = this.idCita;

    this.idPatient = this.activatedRoute.snapshot.params.patient_id;
    this.idPreviousAppoinment = this.activatedRoute.snapshot.params.prev_appointment;

    console.log(this.idPatient, this.idPreviousAppoinment);

    this._publicationsService.getSubServicio(this.idSubServicio).then(res => {
      this.SubServicio = res;
      this.citas = this.SubServicio.numeroCitas;
      //console.log(this.citas);
      
    })

    if (this.idPatient != 0) {
      this.isPet ?
        this.selectPetPatient(this._globals.PETS.find(p => p.idMascotas == this.idPatient)) :
        this._userService.getUserByID(this.idPatient).then(data => this.selectPatient(data));

      this.noneSymptom = true;
      this.getBranchsService();
      this.slides.slideTo(1);
    }
  }

  /**
   * Método para adelantar un slide.
   */
  async nextSlide() {
    let current = await this.slides.getActiveIndex();
    this.validateSlides(current).then((slideIndex: number) => this.slides.slideTo(slideIndex)).catch();
  }

  /**
   * Método para retroceder un slide.
   */
  async prevSlide() {
    let current = await this.slides.getActiveIndex();
    let size = await this.slides.length() - 1;

    if (this.idPatient != 0) {
      if (current == 2) {
        this.disabledPrevButton = true;
        this.disabledNextButton = false;
        return;
      }

      if (current == 6) {
        this.textNextButton = 'Siguiente';
        this.disabledPrevButton = false;
        this.disabledNextButton = false;
        this.slides.slideTo(3);
        return;
      }

      this.disabledPrevButton = false;
      this.disabledNextButton = false;
    }

    // if (current == 2 && this.idPatient != 0) this.disabledPrevButton = true;

    if (current == 1){
      this.disabledPrevButton = true;
      this.disabledNextButton = false; 
    }
    if (current == 6) this.textNextButton = 'Siguiente';
    if (current == 7) this.slides.slideTo(0);
    else this.slides.slidePrev();
  }

  /**
   * Método para validar datos y carga de datos de los slides.
   * @param currentSlide Posisción slide actual 
   */
  async validateSlides(currentSlide) {

    return new Promise(async (resolve, reject) => {
      let size = await this.slides.length() - 1;

      // Reprogram Appointment
      if (this.idPatient != 0) {
        if (currentSlide == 4) {
          this.textNextButton = 'Renovar cita';
          return resolve(6);
        }

        if (currentSlide == 6) {
          this.reprogramAppointment();
          return resolve(6);
        }
      }

      // New Appointment
      if (currentSlide == 0 && this.patient) {
        this.disabledNextButton = true;
        this.disabledPrevButton = false;

        this._publicationsService.getMemberDataById(this.idProvider).then(res => {
          this.provider = res;
          
        });

        return resolve(await this.slides.length());
      }

      console.log(currentSlide);
      

      if (currentSlide == 0) {
        this.getBranchsService();
        this.disabledPrevButton = false;
        this.disabledNextButton = true;
      }

      if (currentSlide == 1) {
        console.log('doctor');
        this.getDoctorsBranch();
        this.doctorSelected = null;
        this.disabledPrevButton = false;
        this.disabledNextButton = true;
      }

      if (currentSlide == 2) {
        // this.getSchedules();
        this.disabledNextButton = true;
      }

      if (currentSlide == 4) {
        // this.getGroupsBeneficiaries();
        await this.getBeneficiaries();
        this.disabledNextButton = true;
      }

      if (currentSlide == 5) {
        this.textNextButton = 'Solicitar cita';
      }
      
      if (currentSlide == 6) {
        this.getAppoinment();
        await this.verOrdenDescuento();
        return reject(false);
      }

      return resolve(currentSlide + 1);
    });
  }

  /**
   * Método que se ejecuta cuando cambia el estado de un slide y actualiza los datos respectivos (sucursales, médicos, horarios).
   */
  async swipeSlide() {
    let current = await this.slides.getActiveIndex();
  }

  /**
   * Método para obtener desde api las sucursales de el servicio seleccionado.
   */
  async getBranchsService() {
    let branchs = await this._appointmentService.getBranchsService(this.municipality, this.idSubServicio, this.company);
    this.branchsMedical = branchs;
    console.log(this.branchsMedical);
    
  }

  /**
   * Método para obtener desde api los doctores correspondientes a la sucursal seleccionada.
   */
  async getDoctorsBranch() {
    let temp = await this._appointmentService.getDoctorsBranch(this.idSubServicio, this.municipality, this.branchSelected['idSucursales']);
    //console.log(this.idSubServicio);
    this.doctors = temp.map(doc => {
      let _doc = doc;
      _doc.avatar = doc.fotos.find(e => e.favorita && e.tipo == 'avatar')?.path || undefined;
      _doc.coverpage = doc.fotos.find(e => e.favorita && e.tipo == 'portada')?.path || undefined;
      return _doc;
    });
  }

  /**
   * Método para obtener los horarios disponibles de un doctor.
   */
  async getSchedules(date?: Date) {
    let _date = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    let schedules = await this._appointmentService.getScheduleDoctor(_date, this.branchSelected['idSucursales'], this.doctorSelected['idMedico'], this.idSubServicio);

    if (schedules.length > 0 && schedules[0].consultorio?.idConsultorios != '') {
      this.schedules = schedules;
    } else {
      this.schedules = [];
    }

    console.log(this.schedules);
  }

  async getBeneficiaries() {
    // this.titular = {
    //   nombres: this._globals.USER_OBJECT['nombres'],
    //   apellidos: this._globals.USER_OBJECT['apellidos'],
    //   eps: this._globals.USER_OBJECT['eps'] || 'no registra',
    //   idusuarios: this._globals.USER_OBJECT['idMembers'],
    //   avatar: this._globals.USER_OBJECT['fotos'].find(f => (f.tipo == 'avatar' && f.favorita == 1)).path
    // };

    let group = await this._beneficiariesService.getGroupsForMember(this._globals.USER_OBJECT['idMembers']).toPromise() || undefined;

    if (!group) {
      this.beneficiaries.push(this._globals.USER_OBJECT);
      return
    }
    
    let temp = group ? await this._beneficiariesService.getDataGroup(group['idGrupos']).toPromise() : undefined;
    console.log(temp);
    
    this.beneficiaries = temp?.beneficiarios || [];
    this.pets = temp?.mascotas || [];
    // this.beneficiaries.unshift(this.titular);
    console.log(this.beneficiaries)
  }

  getGroupsBeneficiaries() {
    // this.titular = {
    //   nombres: this._globals.USER_OBJECT['nombres'],
    //   apellidos: this._globals.USER_OBJECT['apellidos'],
    //   eps: this._globals.USER_OBJECT['eps'],
    //   idusuarios: this._globals.USER_OBJECT['idMembers'],
    //   avatar: this._globals.USER_OBJECT['fotos'].find(f => (f.tipo == 'avatar' && f.favorita == 1)).path
    // };

    this._beneficiariesService.getBeneficiariesGroupByMember(this._globals.USER_OBJECT['idMembers']).subscribe(res => {
      console.log(res);

      this.groupsBeneficiaries = res;
      this.beneficiaries = this.groupsBeneficiaries.map(e => e.beneficiarios).flat();
      // this.beneficiaries.unshift(this.titular);
    })
  }

  /**
   * Método para settear una sucursal cuando es seleccionada por el usuario.
   * @param branch Sucursal seleccionada que se pasa desde el template.
   */
  selectBranch(branch) {
    this.disabledNextButton = true;
    this.branchSelected = branch;
    this.dataAppoinment['toShow']['addressBranch'] = branch['direccionSucursal'];
    this.dataAppoinment['toShow']['neighborhoodBranch'] = branch['barrioSucursal'];
    this.dataAppoinment['toShow']['phoneBranch'] = branch['telefonoSucursal'];
    this.dataAppoinment['toShow']['mobileBranch'] = branch['celularSucursal'];
    this.dataAppoinment['toShow']['department'] = branch['nombreMunicipio'];

    this.dataAppoinment['toSend']['idSucursales'] = branch['idSucursales'];

    this.disabledNextButton = false;
  }

  certificadoActivado(){
  }

  async mostrarCertificado(){
    let modal = await this.modalController.create({
      component: ModalCertificadoComponent,
      cssClass: 'modal__template'
    })

    modal.present()
  }

  /**
   * Método para settear un doctor cuando es seleccionado por el usuario.
   * @param doctor Médico seleccionado que se pasa desde el template.
   */
  selectDoctor(doctor) {
    this.mostrarCertificado()
    this.doctorSelected = doctor;
    this.disabledNextButton = false;
    this.dataAppoinment['toSend']['idMedico'] = doctor['idMedico'];
    this.dataAppoinment['toShow']['nameDoctor'] = `${this.doctorSelected['nombres']} ${this.doctorSelected['apellidos']}`;
  }

  selectGroupBeneficiaries(group) {
    if (group == 'all') {
      this.groupSelected = group;
      this.beneficiaries = this.groupsBeneficiaries.map(e => e.beneficiarios).flat();
      this.beneficiaries.unshift(this.titular);
      return;
    }

    this.beneficiaries = group['beneficiarios'];
    this.groupSelected = group['grupo']['idGrupos'];
  }

  selectPatient(patient) {
    this.patientSelected = patient;
    this.disabledNextButton = false;
    this.dataAppoinment['toSend']['paciente'] = patient['idMembers'];
    this.dataAppoinment['toShow']['namePatient'] = `${patient['nombres']} ${patient['apellidos']}`;
    var motivo = (<HTMLInputElement>document.getElementById('motivo')).value
    this.dataAppoinment['toSend']['motivoCita'] = motivo;
    console.log(this.dataAppoinment);
    //console.log(motivo);
  }

  selectPetPatient(pet) {
    this.petPatientSelected = pet;
    this.disabledNextButton = false;
    this.dataAppoinment['toSend']['idMascota'] = pet['idMascotas'];
    this.dataAppoinment['toShow']['namePatient'] = `${pet['nombreMascota']} ${pet['apellidosMascota']}`;
    console.log(this.dataAppoinment);
  }

  /**
   * Método para settear la fecha y actualizar los horarios del doctor.
   * @param event Evento del calendario con la fecha seleccionada por el usuario
   */
  setDate(date: Date) {
    let today = new Date().toISOString().split('T')[0]
    let daySelected = new Date(date).toISOString().split('T')[0]

    if (new Date(daySelected).getTime() < new Date(today).getTime()) {
      // this._utilitiesService.showInfoDialog('Advertencia', 'Nó es posible seleccionar una fecha pasada');
      return
    }

    this.dateSelected = `${new Date(date).toISOString().split('T')[0]}`;

    this.dataAppoinment['toSend']['fecha'] = `${date.toISOString().split('T')[0]}`;
    this.getSchedules(date);

    this.limitHour = new Date(new Date().setHours(new Date().getHours())).getHours()
    this.scheduleSelected = '-1';
    this.nextSlide()
  }

  selectHour(hourSchedule, index) {
    console.log(hourSchedule, index);
    
    if (this.selectableHour(hourSchedule)) {
      this.scheduleSelected = '-1';
      return
    }

    this.disabledNextButton = false;
    this.scheduleSelected = index + '_' + hourSchedule;

    this.dataAppoinment['toShow']['nameConsultingRoom'] = this.schedules[index]['consultorio']['nombreConsultorio'];
    this.dataAppoinment['toShow']['nameBranch'] = this.branchSelected['nombreSucursal'];

    this.dataAppoinment['toSend']['hora'] = `${hourSchedule <= 11 ? hourSchedule + ' a.m': hourSchedule + ' p.m'}`;
    this.dataAppoinment['toSend']['fecha'] = `${this.dateSelected} ${hourSchedule}:00`;
    this.dataAppoinment['toSend']['idConsultorios'] = this.schedules[index]['consultorio']['idConsultorios'];
    this.dataAppoinment['toSend']['_idHorario'] = this.schedules[index]['horario']['_id'];
  }

  selectableHour(hour) {
    let date = new Date();
    let dateS = new Date(`${this.dateSelected}T00:00`);
    let fecha = this.dateLocal(date);
    let fechaSelec = this.dateLocal(dateS);
    let today = fecha.split('T')[0].split('-')[2]
    let daySelected = fechaSelec.split('T')[0].split('-')[2]
    let month = fecha.split('T')[0].split('-')[1]
    let monthSelected = fechaSelec.split('T')[0].split('-')[1]
    console.log('Fecha actual', fecha)
    console.log('Fecha seleccionada', fechaSelec)
    return (daySelected <= today && monthSelected <= month) && this.limitHour + 1 >= hour;
  }

  dateLocal(date) {
    var tzo = -date.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function (num) {
        return (num < 10 ? '0' : '') + num;
      };
    return date.getFullYear() +
      '-' + pad(date.getMonth() + 1) +
      '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) +
      ':' + pad(date.getMinutes()) +
      ':' + pad(date.getSeconds()) +
      dif + pad(Math.floor(Math.abs(tzo) / 60)) +
      ':' + pad(Math.abs(tzo) % 60);
  }

  setSurvey() {
    this.personSick = false;
    this.surveySymptoms.forEach(symptom => {
      if (symptom.status) this.personSick = true;
      else this.disabledNextButton = false;
    })
  }

  async viewProfileDoctor(doctor) {
    console.log(doctor);

    let modal = await this.modalController.create({
      component: ModalDetailDoctorComponent,
      cssClass: ['modal__detail', 'doctor__detail'],
      backdropDismiss: false,
      componentProps: {
        data_doctor: doctor
        // {
        //   nombres: `${doctor.nombres} ${doctor.apellidos}`,
        //   nombreEspecialidad: doctor.nombreEspecialidad,
        //   tarjetaProfecional: doctor.tarjetaProfecional,
        //   idMembers: doctor.idMembers,
        //   idMedico: doctor.idMedico,
        //   avatar: doctor.avatar,
        // }
      }
    });

    modal.onDidDismiss().then(data => {
      console.log('close detail doctor');
    })

    modal.present();
  }

  async verOrdenDescuento(){
    let modal = await this.modalController.create({
      component: ModalReciboComponent,
      componentProps:{
        data_cita: this.dataAppoinment,
        data_beneficiarios: this.beneficiaries,
        data_sucursal: this.branchsMedical,
        data_servicio: this.SubServicio
      }
    })

    modal.present();
  }

  caracteres(){
    var array = "abcdefghijkmnpqrtuvwxyzABCDEFGHJKMNPQRTUVWXYZ012346789";
    let caracter = '';
    for (let i = 0; i < 9; i++) {
      caracter += array.charAt(Math.floor(Math.random() * array.length))
    }
    this.idCita = caracter + new Date().getMilliseconds();
  }

  async getAppoinment() {
    let temp = await this._appointmentService.setAppointment(this.speciality != 20 ? this.dataAppoinment['toSend'] : { caso: 'existe_mascota', cita: this.dataAppoinment['toSend'] }, this.speciality == 20);
    temp && setTimeout(() => this.router.navigate([this.speciality != 20 ? '/appointments/my-appointments/' : '/appointments/pets-appointments/']), 500)
  }

  async reprogramAppointment() {
    let data = this.dataAppoinment['toSend']
    let dataSend = {
      idCitasmedicasactivas: this.idPreviousAppoinment,
      fecha: data['fecha'],
      hora: data['hora'],
      quienSacoCita: data['quienSacoCita'],
      idSubServicios: data['idSubServicios'],
      idConsultorios: data['idConsultorios'],
      _idHorario: data['_idHorario'],
      idSucursales: data['idSucursales'],
      idMedico: data['idMedico'],
    }

    let dataPet = {
      idCitasMascotasActivas: this.idPreviousAppoinment,
      fecha: data['fecha'],
      hora: data['hora'],
      quienSacoCita: data['quienSacoCita'],
      idServicios: data['idServicios'],
      idConsultorios: data['idConsultorios'],
      _idHorario: data['_idHorario'],
      idSucursales: data['idSucursales'],
      idMedico: data['idMedico'],
      idMascotas: data['idMascota']
    }
    
    console.log(data);
    console.log(dataSend);
    
    let res = await this._appointmentService.reprogramAppointment(this.isPet ? dataPet : dataSend, this.isPet);
    res && setTimeout(() => this.router.navigate(['/home/']), 500);
  }

  // dragStart(event) {
  //   let container = document.querySelector('.slides__item.calendar')
  //   let offSetX = event.clientX;
  //   let offSetY = event.clientY;

  //   console.log(offSetX, offSetY);
  //   console.log(event);
  // }

  // dragEnd(event) {
  //   console.log(event);
  // }

  // drag(event) {
  //   console.log(event);
  // }

  sizeContainer = 0;
  active = false;
  currentY;
  initialY;
  yOffset = 0;

  dragStart(e) {
    this.sizeContainer = document.querySelector('.slides__item.calendar').clientHeight;

    if (e.type === "touchstart") {
      this.initialY = e.touches[0].clientY - this.yOffset;
      console.log(this.sizeContainer, this.initialY);
    } else {
      // this.initialY = e.clientY - this.yOffset;
    }

    this.active = true;
  }

  drag(e) {
    if (this.active) {

      e.preventDefault();

      if (e.type === "touchmove" && e.touches[0].clientY > 200 && e.touches[0].clientY < 470) {
        let value = this.sizeContainer - e.touches[0].clientY;
        console.log(value);
        // console.log(e.target.parentElement.offsetHeight);
        // this.render.setStyle(e.target.parentElement, 'height', `${e.target.parentElement.offsetHeight + value}px`);
        // this.render.setStyle(e.target.parentElement, 'top', '-800px');

        // this.currentX = e.touches[0].clientX - this.initialX;
        // this.currentY = e.touches[0].clientY - this.initialY;
      } else {
        // this.currentX = e.clientX - this.initialX;
        // this.currentY = e.clientY - this.initialY;
      }

      // this.xOffset = this.currentX;
      // this.yOffset = this.currentY;

      // this.setTranslate(this.currentX, this.currentY, this.dragItem);
    }
  }

  dragEnd(e) {
    this.initialY = this.currentY;

    this.active = false;
  }

  setTranslate(xPos, yPos, el) {
    el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  }
}
