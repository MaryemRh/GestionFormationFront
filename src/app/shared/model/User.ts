export class User{

    id:number;
    username : string;
    password : string;
    matricule: number;
    email : string;
    nom: string;
    prenom : string;
    telephone: string;
	dateEmbauche: Date;
    dateDepart: Date;
    actif: boolean ;
    deleted: boolean ;
    roles: any;
    nomPoste: string;
    linkedin: string;
    bio: string;
    idPoste:number;
    nomEquipe: string;
    idEquipe:number;
    nomActivite: string;
    idActivite:number;
    nomDirection: string;
    idDirection:number;
    // roles: {
    //     idRole: number;
    //     nomRole: string;
    //   }
    capaciteAnalyse :number;
    methodologie:number;
   	maitriseStandards :number;
   	competencesSpecifiques :number;
    gestionProjets :number;
   	organisationRigueurFiabilite :number;
   	gestionRessources :number;
    communicationLangue :number;
   	capacitesRedactionnelles:number;
   	total :number;

}
